from rest_framework import serializers
from pathlib import Path
from django.db.models import Avg, Count
from .models import (
    Category,
    Brand,
    Product,
    ProductAttribute,
    ProductImage,
    ProductComplectation,
    ProductDocument,
    ProductReview,
    FAQCategory,
    FAQQuestion,
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
        children = obj.get_children().filter(is_active=True).order_by('order', 'name')
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
            file_name = Path(document.file.name).name if document.file else ""
            documents.append(
                {
                    "id": document.id,
                    "title": document.title or file_name,
                    "url": document.file.url if document.file else "",
                    "file_name": file_name,
                    "file_size": document.file.size if document.file else None,
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
