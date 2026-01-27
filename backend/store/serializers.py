from rest_framework import serializers
from pathlib import Path
from django.db.models import Avg, Count
from .models import (
    Category,
    Brand,
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
    ProductImage,
    ProductComplectation,
    ProductDocument,
    ProductReview,
    FAQCategory,
    FAQQuestion,
    MainBanner,
)


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    href = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "parent",
            "order",
            "is_active",
            "is_popular",
            "description",
            "image",
            "children",
            "href",
        ]

    def get_children(self, obj):
        children = obj.get_children().filter(is_active=True).order_by("order", "name")
        allowed_ids = self.context.get("allowed_category_ids")
        if allowed_ids is not None:
            children = children.filter(id__in=allowed_ids)
        return CategorySerializer(children, many=True, context=self.context).data

    def get_href(self, obj):
        return f"/catalog/{obj.slug}/"

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return obj.image.url
        return None


class BreadcrumbCategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    href = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "href", "children"]

    def get_children(self, obj):
        children = obj.get_children().filter(is_active=True).order_by("order", "name")
        return [
            {
                "id": child.id,
                "name": child.name,
                "slug": child.slug,
                "href": f"/catalog/{child.slug}/",
            }
            for child in children
        ]

    def get_href(self, obj):
        return f"/catalog/{obj.slug}/"


class CategoryPathSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    href = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "href", "description", "image", "children"]

    def get_children(self, obj):
        children = obj.get_children().filter(is_active=True).order_by("order", "name")
        return [
            {
                "id": child.id,
                "name": child.name,
                "slug": child.slug,
                "href": f"/catalog/{child.slug}/",
                "image": child.image.url if child.image else None,
            }
            for child in children
        ]

    def get_href(self, obj):
        return f"/catalog/{obj.slug}/"

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None


class BrandSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    href = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ["id", "name", "slug", "letter", "logo", "href"]

    def get_logo(self, obj):
        if obj.logo:
            return obj.logo.url
        return None

    def get_href(self, obj):
        return f"/brands/{obj.slug}/"


class ProductListCategorySerializer(serializers.ModelSerializer):
    href = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "href"]

    def get_href(self, obj):
        return f"/catalog/{obj.slug}/"


class ProductListBrandSerializer(serializers.ModelSerializer):
    href = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ["id", "name", "slug", "href"]

    def get_href(self, obj):
        return f"/brands/{obj.slug}/"


class ProductListSerializer(serializers.ModelSerializer):
    category = ProductListCategorySerializer(read_only=True)
    brand = ProductListBrandSerializer(read_only=True)
    image = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    attributes = serializers.SerializerMethodField()
    href = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "code",
            "article",
            "name",
            "slug",
            "price",
            "retail_price",
            "discount_percent",
            "rating",
            "rating_count",
            "is_new",
            "is_active",
            "created_at",
            "image",
            "images",
            "attributes",
            "category",
            "brand",
            "href",
        ]

    def _safe_file_url(self, file_field):
        if not file_field:
            return None
        try:
            if not file_field.storage.exists(file_field.name):
                return None
        except Exception:
            return None
        try:
            return file_field.url
        except Exception:
            return None

    def get_image(self, obj):
        return self._safe_file_url(obj.image)

    def get_images(self, obj):
        images = []
        for image in obj.images.all().order_by("order", "id")[:6]:
            url = self._safe_file_url(image.image)
            if not url:
                continue
            images.append(
                {
                    "id": image.id,
                    "url": url,
                    "alt": image.alt_text,
                    "is_main": image.is_main,
                    "order": image.order,
                }
            )
        return images

    def get_attributes(self, obj):
        attributes = []
        for attribute in (
            obj.attributes.select_related("attribute")
            .all()
            .order_by("order", "id")[:7]
        ):
            value = None
            if attribute.value_number is not None:
                value = attribute.value_number
            elif attribute.value_bool is not None:
                value = "Да" if attribute.value_bool else "Нет"
            else:
                value = attribute.value_text
            attributes.append(
                {
                    "id": attribute.id,
                    "attribute_id": attribute.attribute_id,
                    "name": attribute.attribute.name,
                    "slug": attribute.attribute.slug,
                    "data_type": attribute.attribute.data_type,
                    "unit": attribute.attribute.unit,
                    "value": value,
                    "order": attribute.order,
                }
            )
        return attributes

    def get_href(self, obj):
        return f"/product/{obj.slug}/"


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    image = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    attributes = serializers.SerializerMethodField()
    complectation_items = serializers.SerializerMethodField()
    documents = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    review_stats = serializers.SerializerMethodField()
    href = serializers.SerializerMethodField()
    reviews_href = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "code",
            "article",
            "name",
            "slug",
            "description",
            "description_full",
            "auto_text",
            "tabs_auto_text",
            "documents_auto_text",
            "complectation_items",
            "price",
            "retail_price",
            "discount_percent",
            "min_bonus_price",
            "show_personal_price_difference",
            "image",
            "images",
            "attributes",
            "rating",
            "rating_count",
            "is_new",
            "is_active",
            "weight_kg",
            "created_at",
            "documents",
            "reviews",
            "review_stats",
            "category",
            "brand",
            "href",
            "reviews_href",
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def get_images(self, obj):
        return [
            {
                "id": image.id,
                "url": image.image.url,
                "alt": image.alt_text,
                "is_main": image.is_main,
                "order": image.order,
            }
            for image in obj.images.all()
        ]

    def get_attributes(self, obj):
        attributes = []
        for attribute in obj.attributes.select_related("attribute").all():
            value = None
            if attribute.value_number is not None:
                value = attribute.value_number
            elif attribute.value_bool is not None:
                value = "Да" if attribute.value_bool else "Нет"
            else:
                value = attribute.value_text
            attributes.append(
                {
                    "id": attribute.id,
                    "attribute_id": attribute.attribute_id,
                    "name": attribute.attribute.name,
                    "slug": attribute.attribute.slug,
                    "data_type": attribute.attribute.data_type,
                    "unit": attribute.attribute.unit,
                    "value": value,
                    "order": attribute.order,
                }
            )
        return attributes

    def get_complectation_items(self, obj):
        return [
            {
                "id": item.id,
                "name": item.name,
                "quantity": item.quantity,
                "order": item.order,
            }
            for item in obj.complectation_items.all()
        ]

    def get_documents(self, obj):
        documents = []
        for document in obj.documents.all():
            if not document.file:
                continue
            try:
                if not document.file.storage.exists(document.file.name):
                    continue
            except Exception:
                continue
            file_name = Path(document.file.name).name
            try:
                url = document.file.url
            except Exception:
                url = ""
            try:
                file_size = document.file.size
            except Exception:
                file_size = None
            documents.append(
                {
                    "id": document.id,
                    "title": document.title or file_name,
                    "url": url,
                    "file_name": file_name,
                    "file_size": file_size,
                    "order": document.order,
                }
            )
        return documents

    def get_reviews(self, obj):
        return [
            {
                "id": review.id,
                "author_name": review.author_name,
                "author_email": review.author_email,
                "rating": review.rating,
                "comment": review.comment,
                "pros": review.pros,
                "cons": review.cons,
                "is_anonymous": review.is_anonymous,
                "likes": review.likes,
                "dislikes": review.dislikes,
                "created_at": review.created_at,
            }
            for review in obj.reviews.filter(is_active=True)
        ]

    def get_review_stats(self, obj):
        reviews_qs = obj.reviews.filter(is_active=True)
        aggregated = reviews_qs.aggregate(
            average=Avg("rating"),
            count=Count("id"),
        )
        distribution = {str(score): 0 for score in range(1, 6)}
        for item in reviews_qs.values("rating").annotate(count=Count("id")):
            distribution[str(item["rating"])] = item["count"]
        return {
            "average": float(aggregated["average"] or 0),
            "count": aggregated["count"] or 0,
            "distribution": distribution,
        }

    def get_href(self, obj):
        return f"/product/{obj.slug}/"

    def get_reviews_href(self, obj):
        return f"/product/{obj.slug}/reviews/#reviews"


class FAQQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQQuestion
        fields = [
            "id",
            "question",
            "answer",
            "order",
            "is_active",
            "created_at",
            "updated_at",
        ]


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = [
            "id",
            "product",
            "author_name",
            "author_email",
            "rating",
            "comment",
            "pros",
            "cons",
            "is_anonymous",
            "likes",
            "dislikes",
            "created_at",
        ]


class ProductReviewCreateSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True, required=False)
    product_slug = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = ProductReview
        fields = [
            "id",
            "product_id",
            "product_slug",
            "author_name",
            "author_email",
            "rating",
            "comment",
            "pros",
            "cons",
            "is_anonymous",
        ]

    def validate(self, attrs):
        product_id = attrs.pop("product_id", None)
        product_slug = attrs.pop("product_slug", None)
        product = None
        if product_id is not None:
            product = Product.objects.filter(id=product_id).first()
        if product is None and product_slug:
            product = Product.objects.filter(slug=product_slug).first()
        if product is None:
            raise serializers.ValidationError("Не найден товар для отзыва.")
        attrs["product"] = product
        return attrs

    def create(self, validated_data):
        return ProductReview.objects.create(**validated_data)


class FAQCategorySerializer(serializers.ModelSerializer):
    questions = FAQQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = FAQCategory
        fields = [
            "id",
            "name",
            "slug",
            "order",
            "questions",
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    product_slug = serializers.SerializerMethodField()
    product_image = serializers.SerializerMethodField()
    retail_price = serializers.SerializerMethodField()
    discount_percent = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    total_retail = serializers.SerializerMethodField()
    discount_total = serializers.SerializerMethodField()
    weight_kg = serializers.SerializerMethodField()
    total_weight = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product_id",
            "product_name",
            "product_slug",
            "product_image",
            "quantity",
            "price",
            "retail_price",
            "discount_percent",
            "total",
            "total_retail",
            "discount_total",
            "weight_kg",
            "total_weight",
        ]

    def get_product_name(self, obj):
        return obj.product.name

    def get_product_slug(self, obj):
        return obj.product.slug

    def get_product_image(self, obj):
        if obj.product.image:
            return obj.product.image.url
        return None

    def get_retail_price(self, obj):
        return obj.product.retail_price

    def get_discount_percent(self, obj):
        return obj.product.discount_percent

    def get_total(self, obj):
        return obj.price * obj.quantity

    def get_total_retail(self, obj):
        retail_price = obj.product.retail_price
        if retail_price is None:
            return None
        return retail_price * obj.quantity

    def get_discount_total(self, obj):
        retail_price = obj.product.retail_price
        if retail_price is None:
            return None
        total_retail = retail_price * obj.quantity
        total = obj.price * obj.quantity
        return total_retail - total if total_retail > total else 0

    def get_weight_kg(self, obj):
        return obj.product.weight_kg

    def get_total_weight(self, obj):
        if obj.product.weight_kg is None:
            return None
        return obj.product.weight_kg * obj.quantity


class FavoriteItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    product_slug = serializers.SerializerMethodField()
    product_image = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    retail_price = serializers.SerializerMethodField()
    discount_percent = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    is_new = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    category_slug = serializers.SerializerMethodField()
    href = serializers.SerializerMethodField()

    class Meta:
        model = FavoriteItem
        fields = [
            "id",
            "product_id",
            "product_name",
            "product_slug",
            "product_image",
            "price",
            "retail_price",
            "discount_percent",
            "rating",
            "rating_count",
            "is_new",
            "category_name",
            "category_slug",
            "href",
            "created_at",
        ]

    def get_product_name(self, obj):
        return obj.product.name

    def get_product_slug(self, obj):
        return obj.product.slug

    def get_product_image(self, obj):
        if obj.product.image:
            return obj.product.image.url
        return None

    def get_price(self, obj):
        return obj.product.price

    def get_retail_price(self, obj):
        return obj.product.retail_price

    def get_discount_percent(self, obj):
        return obj.product.discount_percent

    def get_rating(self, obj):
        return obj.product.rating

    def get_rating_count(self, obj):
        return obj.product.rating_count

    def get_is_new(self, obj):
        return obj.product.is_new

    def get_category_name(self, obj):
        return obj.product.category.name if obj.product.category else None

    def get_category_slug(self, obj):
        return obj.product.category.slug if obj.product.category else None

    def get_href(self, obj):
        return f"/product/{obj.product.slug}/"


class FavoriteListSerializer(serializers.ModelSerializer):
    items = FavoriteItemSerializer(many=True, read_only=True)
    total_count = serializers.SerializerMethodField()

    class Meta:
        model = FavoriteList
        fields = ["token", "created_at", "items", "total_count"]

    def get_total_count(self, obj):
        return obj.items.count()


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    promo_code = serializers.SerializerMethodField()
    total_quantity = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    total_retail = serializers.SerializerMethodField()
    total_discount = serializers.SerializerMethodField()
    promo_discount = serializers.SerializerMethodField()
    total_due = serializers.SerializerMethodField()
    total_weight = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            "token",
            "created_at",
            "items",
            "promo_code",
            "total_quantity",
            "total_price",
            "total_retail",
            "total_discount",
            "promo_discount",
            "total_due",
            "total_weight",
        ]

    def _items(self, obj):
        return obj.items.select_related("product")

    def _subtotal(self, obj):
        return sum(item.price * item.quantity for item in self._items(obj))

    def get_promo_code(self, obj):
        return obj.promo_code.code if obj.promo_code else None

    def get_total_quantity(self, obj):
        return sum(item.quantity for item in self._items(obj))

    def get_total_price(self, obj):
        return self._subtotal(obj)

    def get_total_retail(self, obj):
        total = 0
        has_retail = False
        for item in self._items(obj):
            if item.product.retail_price is None:
                continue
            has_retail = True
            total += item.product.retail_price * item.quantity
        return total if has_retail else None

    def get_total_discount(self, obj):
        total_discount = 0
        has_retail = False
        for item in self._items(obj):
            retail_price = item.product.retail_price
            if retail_price is None:
                continue
            has_retail = True
            total_discount += max(
                (retail_price * item.quantity) - (item.price * item.quantity), 0
            )
        return total_discount if has_retail else None

    def get_promo_discount(self, obj):
        if not obj.promo_code:
            return 0
        subtotal = self._subtotal(obj)
        return obj.promo_code.calculate_discount(subtotal)

    def get_total_due(self, obj):
        subtotal = self._subtotal(obj)
        promo_discount = self.get_promo_discount(obj) or 0
        return max(subtotal - promo_discount, 0)

    def get_total_weight(self, obj):
        total = 0
        has_weight = False
        for item in self._items(obj):
            if item.product.weight_kg is None:
                continue
            has_weight = True
            total += item.product.weight_kg * item.quantity
        return total if has_weight else None


class DeliveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMethod
        fields = [
            "id",
            "code",
            "name",
            "description",
            "icon",
            "requires_address",
            "requires_delivery_date",
            "is_default",
        ]


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = [
            "id",
            "code",
            "name",
            "description",
            "icon",
            "is_default",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    product_slug = serializers.SerializerMethodField()
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product_id",
            "product_name",
            "product_slug",
            "product_image",
            "quantity",
            "price",
        ]

    def get_product_name(self, obj):
        return obj.product.name

    def get_product_slug(self, obj):
        return obj.product.slug

    def get_product_image(self, obj):
        if obj.product.image:
            return obj.product.image.url
        return None


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "customer_name",
            "customer_email",
            "customer_phone",
            "address_line",
            "city",
            "postal_code",
            "delivery_method_code",
            "payment_method_code",
            "comment",
            "total",
            "created_at",
            "items",
        ]


class OrderCreateSerializer(serializers.Serializer):
    cart_token = serializers.UUIDField()
    customer_name = serializers.CharField(max_length=120)
    customer_email = serializers.EmailField(required=False, allow_blank=True)
    customer_phone = serializers.CharField(required=False, allow_blank=True, max_length=40)
    address = serializers.CharField(required=False, allow_blank=True)
    delivery_method = serializers.CharField(required=False, allow_blank=True)
    payment_method = serializers.CharField(required=False, allow_blank=True)
    comment = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        cart = Cart.objects.filter(token=attrs["cart_token"]).prefetch_related(
            "items__product"
        ).first()
        if cart is None:
            raise serializers.ValidationError("Корзина не найдена.")
        if not cart.items.exists():
            raise serializers.ValidationError("Корзина пуста.")
        attrs["cart"] = cart
        return attrs


class CartItemCreateSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=False)
    product_slug = serializers.CharField(required=False)
    quantity = serializers.IntegerField(min_value=1, default=1)

    def validate(self, attrs):
        product_id = attrs.get("product_id")
        product_slug = attrs.get("product_slug")
        product = None
        if product_id is not None:
            product = Product.objects.filter(id=product_id).first()
        if product is None and product_slug:
            product = Product.objects.filter(slug=product_slug).first()
        if product is None:
            raise serializers.ValidationError("Не найден товар для корзины.")
        attrs["product"] = product
        return attrs


class FavoriteItemCreateSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()

    def validate(self, attrs):
        product_id = attrs.get("product_id")
        product = Product.objects.filter(id=product_id).first()
        if product is None:
            raise serializers.ValidationError("Не найден товар для избранного.")
        attrs["product"] = product
        return attrs


class LeadRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadRequest
        fields = [
            "id",
            "name",
            "address",
            "email",
            "phone",
            "comment",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "status", "created_at"]


class MainBannerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    image_desktop = serializers.SerializerMethodField()

    class Meta:
        model = MainBanner
        fields = [
            "id",
            "title",
            "href",
            "image",
            "image_desktop",
            "position",
            "banner_type",
            "show_on_mobile",
            "show_on_desktop",
            "advertiser",
            "ogrn",
            "token",
        ]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_image_desktop(self, obj):
        if obj.image_desktop:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image_desktop.url)
            return obj.image_desktop.url
        return None


class CartItemUpdateSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1)
