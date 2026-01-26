from decimal import Decimal, InvalidOperation
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q, Exists, OuterRef
from django.shortcuts import get_object_or_404
from .models import (
    Brand,
    Category,
    Product,
    Cart,
    CartItem,
    FavoriteList,
    FavoriteItem,
    LeadRequest,
    PromoCode,
    DeliveryMethod,
    PaymentMethod,
    Order,
    OrderItem,
    ProductAttribute,
    ProductReview,
    FAQCategory,
    FAQQuestion,
)
from .serializers import (
    BrandSerializer,
    BreadcrumbCategorySerializer,
    CategorySerializer,
    ProductSerializer,
    ProductReviewSerializer,
    ProductReviewCreateSerializer,
    FAQCategorySerializer,
    FAQQuestionSerializer,
    CartSerializer,
    CartItemSerializer,
    CartItemCreateSerializer,
    CartItemUpdateSerializer,
    FavoriteListSerializer,
    FavoriteItemCreateSerializer,
    LeadRequestSerializer,
    DeliveryMethodSerializer,
    PaymentMethodSerializer,
    OrderSerializer,
    OrderCreateSerializer,
)

MIN_PUBLIC_PRICE = Decimal("50000")


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True).order_by("order", "name")
    serializer_class = CategorySerializer

    def _hide_empty(self):
        raw = self.request.query_params.get("hide_empty")
        if raw is None:
            return True
        return str(raw).lower() in ("1", "true", "yes")

    def _get_non_empty_category_ids(self):
        if hasattr(self, "_non_empty_category_ids"):
            return self._non_empty_category_ids
        active_products = Product.objects.filter(
            is_active=True,
            price__gte=MIN_PUBLIC_PRICE,
            category__tree_id=OuterRef("tree_id"),
            category__lft__gte=OuterRef("lft"),
            category__rght__lte=OuterRef("rght"),
        )
        category_ids = (
            Category.objects.filter(is_active=True)
            .annotate(has_products=Exists(active_products))
            .filter(has_products=True)
            .values_list("id", flat=True)
        )
        self._non_empty_category_ids = list(category_ids)
        return self._non_empty_category_ids

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action == "list":
            queryset = queryset.filter(level=0)
        if self._hide_empty():
            queryset = queryset.filter(id__in=self._get_non_empty_category_ids())
        is_popular = self.request.query_params.get("is_popular")
        if is_popular is not None:
            queryset = queryset.filter(is_popular=is_popular.lower() in ("1", "true", "yes"))
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self._hide_empty():
            context["allowed_category_ids"] = self._get_non_empty_category_ids()
        return context

    @action(detail=True, methods=["get"])
    def path(self, request, pk=None):
        category = self.get_object()
        path = category.get_ancestors(include_self=True).filter(is_active=True)
        serializer = BreadcrumbCategorySerializer(path, many=True, context={"request": request})
        return Response(serializer.data)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Product.objects.filter(is_active=True, price__gte=MIN_PUBLIC_PRICE)
        .select_related("category", "brand")
        .prefetch_related("images", "attributes__attribute", "documents", "reviews")
        .order_by("-created_at")
    )
    serializer_class = ProductSerializer

    def _parse_param_list(self, key):
        raw_values = self.request.query_params.getlist(key)
        if not raw_values:
            return []
        values = []
        for raw in raw_values:
            if raw is None:
                continue
            for part in str(raw).split(","):
                value = part.strip()
                if value:
                    values.append(value)
        return values

    def _apply_category_filter(self, queryset, category_slug):
        if not category_slug:
            return queryset
        try:
            category = Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            return queryset.none()
        category_ids = category.get_descendants(include_self=True).values_list(
            "id", flat=True
        )
        return queryset.filter(category_id__in=category_ids)

    def _apply_brand_filter(self, queryset, brand_values):
        if not brand_values:
            return queryset
        ids = []
        slugs = []
        for value in brand_values:
            if value.isdigit():
                ids.append(int(value))
            else:
                slugs.append(value)
        brand_filter = Q()
        if ids:
            brand_filter |= Q(brand_id__in=ids)
        if slugs:
            brand_filter |= Q(brand__slug__in=slugs)
        if brand_filter:
            return queryset.filter(brand_filter)
        return queryset

    def _apply_country_filter(self, queryset, country_values):
        if not country_values:
            return queryset
        attribute_filter = Q(
            attributes__attribute__name__iexact="Страна производства"
        ) | Q(attributes__attribute__slug__iexact="страна-производства")
        value_filter = Q()
        for value in country_values:
            value_filter |= Q(attributes__value_text__iexact=value)
        if not value_filter:
            return queryset
        return queryset.filter(attribute_filter & value_filter).distinct()

    def _parse_decimal(self, value):
        if value is None:
            return None
        try:
            return Decimal(str(value).strip())
        except (InvalidOperation, ValueError):
            return None

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get("category")
        slug = self.request.query_params.get("slug")
        is_new = self.request.query_params.get("is_new")
        brand_values = self._parse_param_list("brand")
        country_values = self._parse_param_list("country")
        price_min = self._parse_decimal(self.request.query_params.get("price_min"))
        price_max = self._parse_decimal(self.request.query_params.get("price_max"))
        if not country_values:
            country_values = self._parse_param_list("country_of_origin")
        if slug:
            queryset = queryset.filter(slug=slug)
        if category_slug:
            queryset = self._apply_category_filter(queryset, category_slug)
        if is_new is not None:
            queryset = queryset.filter(is_new=is_new.lower() in ("1", "true", "yes"))
        if brand_values:
            queryset = self._apply_brand_filter(queryset, brand_values)
        if country_values:
            queryset = self._apply_country_filter(queryset, country_values)
        if price_min is not None:
            queryset = queryset.filter(price__gte=price_min)
        if price_max is not None:
            queryset = queryset.filter(price__lte=price_max)
        return queryset

    @action(detail=False, methods=["get"])
    def countries(self, request):
        queryset = self.queryset
        category_slug = request.query_params.get("category")
        if category_slug:
            queryset = self._apply_category_filter(queryset, category_slug)
        brand_values = self._parse_param_list("brand")
        if brand_values:
            queryset = self._apply_brand_filter(queryset, brand_values)
        country_attributes = Q(attribute__name__iexact="Страна производства") | Q(
            attribute__slug__iexact="страна-производства"
        )
        countries = (
            ProductAttribute.objects.filter(product__in=queryset)
            .filter(country_attributes)
            .exclude(value_text="")
            .values_list("value_text", flat=True)
            .distinct()
            .order_by("value_text")
        )
        return Response(list(countries))


class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.filter(is_active=True).order_by("letter", "order", "name")
    serializer_class = BrandSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = super().get_queryset()
        hide_empty = self.request.query_params.get("hide_empty")
        if hide_empty is None or str(hide_empty).lower() in ("1", "true", "yes"):
            queryset = queryset.filter(
                products__is_active=True,
                products__price__gte=MIN_PUBLIC_PRICE,
            ).distinct()
        letter = self.request.query_params.get("letter")
        category_slug = self.request.query_params.get("category")
        if letter:
            queryset = queryset.filter(letter__iexact=letter)
        if category_slug:
            try:
                category = Category.objects.get(slug=category_slug)
            except Category.DoesNotExist:
                return queryset.none()
            category_ids = category.get_descendants(include_self=True).values_list(
                "id", flat=True
            )
            queryset = queryset.filter(products__category_id__in=category_ids).distinct()
        return queryset


class FAQCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQCategory.objects.all().order_by("order")
    serializer_class = FAQCategorySerializer


class FAQQuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQQuestion.objects.filter(is_active=True).order_by("order")
    serializer_class = FAQQuestionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category', None)
        if category_slug is not None:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset


class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.filter(is_active=True).select_related("product")
    serializer_class = ProductReviewSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        product_id = self.request.query_params.get("product_id")
        product_slug = self.request.query_params.get("product_slug")
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        if product_slug:
            queryset = queryset.filter(product__slug=product_slug)
        return queryset

    def get_serializer_class(self):
        if self.action == "create":
            return ProductReviewCreateSerializer
        return ProductReviewSerializer


class CartViewSet(viewsets.ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]

    def _get_cart(self, token):
        return get_object_or_404(Cart.objects.prefetch_related("items__product"), token=token)

    def create(self, request):
        cart = Cart.objects.create()
        serializer = CartSerializer(cart, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        cart = self._get_cart(pk)
        serializer = CartSerializer(cart, context={"request": request})
        return Response(serializer.data)

    @action(detail=True, methods=["post"], url_path="items")
    def add_item(self, request, pk=None):
        cart = self._get_cart(pk)
        serializer = CartItemCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data["product"]
        quantity = serializer.validated_data.get("quantity", 1)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": quantity, "price": product.price},
        )
        if not created:
            item.quantity += quantity
            item.price = product.price
            item.save(update_fields=["quantity", "price"])

        cart.refresh_from_db()
        response = CartSerializer(cart, context={"request": request})
        return Response(response.data)


class ShareCartViewSet(viewsets.ViewSet):
    def list(self, request):
        raw_products = request.query_params.get("products", "")
        entries = []
        for part in raw_products.split(","):
            item = part.strip()
            if not item:
                continue
            if ":" in item:
                product_id, qty = item.split(":", 1)
            else:
                product_id, qty = item, "1"
            if not product_id.isdigit():
                continue
            try:
                quantity = int(qty)
            except (TypeError, ValueError):
                quantity = 1
            if quantity < 1:
                continue
            entries.append((int(product_id), quantity))

        if not entries:
            return Response(
                {
                    "items": [],
                    "total_quantity": 0,
                    "total_price": Decimal("0.00"),
                    "total_discount": Decimal("0.00"),
                }
            )

        product_ids = [product_id for product_id, _ in entries]
        products = {
            product.id: product
            for product in Product.objects.filter(id__in=product_ids)
        }

        items = []
        total_quantity = 0
        total_price = Decimal("0.00")
        total_discount = Decimal("0.00")
        total_weight = Decimal("0.00")
        has_weight = False

        for product_id, quantity in entries:
            product = products.get(product_id)
            if not product:
                continue
            line_total = product.price * quantity
            retail_total = (
                product.retail_price * quantity if product.retail_price else None
            )
            discount_total = (
                retail_total - line_total
                if retail_total and retail_total > line_total
                else Decimal("0.00")
            )
            total_quantity += quantity
            total_price += line_total
            total_discount += discount_total
            if product.weight_kg is not None:
                has_weight = True
                total_weight += product.weight_kg * quantity
            items.append(
                {
                    "product_id": product.id,
                    "product_name": product.name,
                    "product_slug": product.slug,
                    "product_image": product.image.url if product.image else None,
                    "price": product.price,
                    "retail_price": product.retail_price,
                    "discount_percent": product.discount_percent,
                    "quantity": quantity,
                    "total": line_total,
                    "total_retail": retail_total,
                    "discount_total": discount_total,
                    "weight_kg": product.weight_kg,
                    "total_weight": product.weight_kg * quantity if product.weight_kg is not None else None,
                    "href": f"/product/{product.slug}/",
                }
            )

        return Response(
            {
                "items": items,
                "total_quantity": total_quantity,
                "total_price": total_price,
                "total_discount": total_discount,
                "total_weight": total_weight if has_weight else None,
            }
        )


class FavoriteViewSet(viewsets.ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]

    def _get_favorites(self, token):
        return get_object_or_404(
            FavoriteList.objects.prefetch_related("items__product__category"),
            token=token,
        )

    def _serialize(self, favorites, request):
        serializer = FavoriteListSerializer(favorites, context={"request": request})
        return serializer.data

    def create(self, request):
        favorites = FavoriteList.objects.create()
        return Response(self._serialize(favorites, request), status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        favorites = self._get_favorites(pk)
        return Response(self._serialize(favorites, request))

    @action(detail=True, methods=["post"], url_path="items")
    def add_item(self, request, pk=None):
        favorites = self._get_favorites(pk)
        serializer = FavoriteItemCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data["product"]
        FavoriteItem.objects.get_or_create(favorites=favorites, product=product)
        favorites.refresh_from_db()
        return Response(self._serialize(favorites, request))

    @action(detail=True, methods=["delete"], url_path="items/(?P<item_id>[^/.]+)/remove")
    def remove_item(self, request, pk=None, item_id=None):
        favorites = self._get_favorites(pk)
        item = get_object_or_404(FavoriteItem, favorites=favorites, id=item_id)
        item.delete()
        favorites.refresh_from_db()
        return Response(self._serialize(favorites, request))

    @action(detail=True, methods=["delete"], url_path="items/remove")
    def remove_by_product(self, request, pk=None):
        favorites = self._get_favorites(pk)
        product_id = request.query_params.get("product_id")
        if product_id is None:
            product_id = request.data.get("product_id") if isinstance(request.data, dict) else None
        if not product_id:
            return Response({"detail": "product_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        FavoriteItem.objects.filter(favorites=favorites, product_id=product_id).delete()
        favorites.refresh_from_db()
        return Response(self._serialize(favorites, request))

    @action(detail=True, methods=["delete"], url_path="clear")
    def clear(self, request, pk=None):
        favorites = self._get_favorites(pk)
        favorites.items.all().delete()
        favorites.refresh_from_db()
        return Response(self._serialize(favorites, request))


class LeadRequestViewSet(viewsets.ModelViewSet):
    queryset = LeadRequest.objects.all().order_by("-created_at", "-id")
    serializer_class = LeadRequestSerializer
    http_method_names = ["post", "head", "options"]
    authentication_classes = []
    permission_classes = [AllowAny]


class DeliveryMethodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DeliveryMethod.objects.filter(is_active=True).order_by("order", "id")
    serializer_class = DeliveryMethodSerializer
    pagination_class = None


class PaymentMethodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PaymentMethod.objects.filter(is_active=True).order_by("order", "id")
    serializer_class = PaymentMethodSerializer
    pagination_class = None


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.prefetch_related("items__product").order_by("-created_at")

    def get_serializer_class(self):
        if self.action == "create":
            return OrderCreateSerializer
        return OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.validated_data["cart"]

        customer_name = serializer.validated_data.get("customer_name", "").strip()
        customer_email = serializer.validated_data.get("customer_email", "").strip()
        customer_phone = serializer.validated_data.get("customer_phone", "").strip()
        address_raw = serializer.validated_data.get("address", "").strip()
        delivery_method = serializer.validated_data.get("delivery_method", "").strip()
        payment_method = serializer.validated_data.get("payment_method", "").strip()
        comment = serializer.validated_data.get("comment", "").strip()

        if not customer_email:
            customer_email = "no-reply@local"

        city = ""
        address_line = address_raw
        if address_raw and "," in address_raw:
            parts = [part.strip() for part in address_raw.split(",", 1)]
            city = parts[0]
            address_line = parts[1] if len(parts) > 1 else address_raw
        if not address_line:
            address_line = "Самовывоз"

        total = 0
        for item in cart.items.all():
            total += item.price * item.quantity
        promo_discount = cart.promo_code.calculate_discount(total) if cart.promo_code else 0
        total_due = max(total - promo_discount, 0)

        order = Order.objects.create(
            customer_name=customer_name,
            customer_email=customer_email,
            customer_phone=customer_phone,
            address_line=address_line,
            city=city,
            delivery_method_code=delivery_method,
            payment_method_code=payment_method,
            comment=comment,
            total=total_due,
        )

        OrderItem.objects.bulk_create(
            [
                OrderItem(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.price,
                )
                for item in cart.items.all()
            ]
        )

        cart.items.all().delete()
        cart.promo_code = None
        cart.save(update_fields=["promo_code"])

        response = OrderSerializer(order, context={"request": request})
        return Response(response.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["patch", "put"], url_path="items/(?P<item_id>[^/.]+)")
    def update_item(self, request, pk=None, item_id=None):
        cart = self._get_cart(pk)
        item = get_object_or_404(CartItem, cart=cart, id=item_id)
        serializer = CartItemUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        item.quantity = serializer.validated_data["quantity"]
        item.price = item.product.price
        item.save(update_fields=["quantity", "price"])

        cart.refresh_from_db()
        response = CartSerializer(cart, context={"request": request})
        return Response(response.data)

    @action(detail=True, methods=["delete"], url_path="items/(?P<item_id>[^/.]+)/remove")
    def remove_item(self, request, pk=None, item_id=None):
        cart = self._get_cart(pk)
        item = get_object_or_404(CartItem, cart=cart, id=item_id)
        item.delete()
        cart.refresh_from_db()
        response = CartSerializer(cart, context={"request": request})
        return Response(response.data)

    @action(detail=True, methods=["post", "delete"], url_path="promo")
    def promo(self, request, pk=None):
        cart = self._get_cart(pk)
        if request.method == "DELETE":
            cart.promo_code = None
            cart.save(update_fields=["promo_code"])
            cart.refresh_from_db()
            response = CartSerializer(cart, context={"request": request})
            return Response(response.data)

        code = (request.data.get("code") or "").strip()
        if not code:
            cart.promo_code = None
            cart.save(update_fields=["promo_code"])
            cart.refresh_from_db()
            response = CartSerializer(cart, context={"request": request})
            return Response(response.data)

        promo = PromoCode.objects.filter(code__iexact=code).first()
        if promo is None:
            return Response(
                {"detail": "Промокод не найден."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        subtotal = sum(
            item.price * item.quantity
            for item in cart.items.select_related("product")
        )
        if not promo.is_valid_for_total(subtotal):
            return Response(
                {"detail": "Промокод недоступен."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart.promo_code = promo
        cart.save(update_fields=["promo_code"])
        cart.refresh_from_db()
        response = CartSerializer(cart, context={"request": request})
        return Response(response.data)
