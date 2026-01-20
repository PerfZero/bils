from rest_framework import serializers
from .models import Category, Brand, Product, ProductAttribute, ProductImage, FAQCategory, FAQQuestion


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
