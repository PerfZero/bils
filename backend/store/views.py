from decimal import Decimal, InvalidOperation
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import (
    Brand,
    Category,
    Product,
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
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True).order_by("order", "name")
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action == "list":
            queryset = queryset.filter(level=0)
        is_popular = self.request.query_params.get("is_popular")
        if is_popular is not None:
            queryset = queryset.filter(is_popular=is_popular.lower() in ("1", "true", "yes"))
        return queryset

    @action(detail=True, methods=["get"])
    def path(self, request, pk=None):
        category = self.get_object()
        path = category.get_ancestors(include_self=True).filter(is_active=True)
        serializer = BreadcrumbCategorySerializer(path, many=True, context={"request": request})
        return Response(serializer.data)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Product.objects.filter(is_active=True)
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

    def get_queryset(self):
        queryset = super().get_queryset()
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
