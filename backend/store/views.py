from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Brand, Category, Product, FAQCategory, FAQQuestion
from .serializers import (
    BrandSerializer,
    BreadcrumbCategorySerializer,
    CategorySerializer,
    ProductSerializer,
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
        .prefetch_related("images", "attributes__attribute")
        .order_by("-created_at")
    )
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get("category")
        slug = self.request.query_params.get("slug")
        is_new = self.request.query_params.get("is_new")
        if slug:
            queryset = queryset.filter(slug=slug)
        if category_slug:
            try:
                category = Category.objects.get(slug=category_slug)
            except Category.DoesNotExist:
                return queryset.none()
            category_ids = category.get_descendants(include_self=True).values_list(
                "id", flat=True
            )
            queryset = queryset.filter(category_id__in=category_ids)
        if is_new is not None:
            queryset = queryset.filter(is_new=is_new.lower() in ("1", "true", "yes"))
        return queryset


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
