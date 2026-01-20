import json
import mimetypes
import re
import ssl
import urllib.request
import urllib.parse
from pathlib import Path
from decimal import Decimal, InvalidOperation

from django import forms
from django.contrib import admin, messages
from django.core.files.base import ContentFile
from django.db import transaction
from django.shortcuts import redirect, render
from django.urls import path
from django.utils.text import slugify
from mptt.admin import MPTTModelAdmin
from .models import (
    Cart,
    CartItem,
    Brand,
    Category,
    Order,
    OrderItem,
    Product,
    Attribute,
    ProductAttribute,
    ProductImage,
    FAQCategory,
    FAQQuestion,
)


@admin.register(Category)
class CategoryAdmin(MPTTModelAdmin):
    list_display = ("name", "slug", "order", "is_popular", "is_active")
    list_filter = ("is_active", "is_popular")
    search_fields = ("name", "slug", "description")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("order", "name")

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('parent')


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "letter", "order", "is_active")
    list_filter = ("is_active", "letter")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("letter", "order", "name")


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0


class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    extra = 0
    fields = ("attribute", "value_text", "value_number", "value_bool", "order")


class ProductImportForm(forms.Form):
    file = forms.FileField(label="JSON файл")
    category = forms.ModelChoiceField(
        queryset=Category.objects.all(),
        label="Категория по умолчанию",
        required=False,
        help_text="Используется, если в JSON нет категории",
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "article",
        "code",
        "brand",
        "category",
        "price",
        "retail_price",
        "is_new",
        "is_active",
        "created_at",
    )
    list_filter = ("is_active", "is_new", "brand", "category")
    search_fields = ("name", "slug", "code", "article")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline, ProductAttributeInline]
    change_list_template = "admin/store/product/change_list.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "import-json/",
                self.admin_site.admin_view(self.import_json_view),
                name="store_product_import",
            ),
        ]
        return custom_urls + urls

    def import_json_view(self, request):
        if request.method == "POST":
            form = ProductImportForm(request.POST, request.FILES)
            if form.is_valid():
                created_count = 0
                updated_count = 0
                skipped_count = 0
                error_count = 0
                image_count = 0
                image_attempts = 0
                image_errors = []
                default_category = form.cleaned_data["category"]
                download_images = True

                try:
                    payload = json.loads(
                        form.cleaned_data["file"].read().decode("utf-8")
                    )
                except json.JSONDecodeError:
                    self.message_user(
                        request,
                        "Файл не содержит корректный JSON.",
                        level=messages.ERROR,
                    )
                    return redirect("..")

                items = payload
                if isinstance(payload, dict):
                    items = payload.get("products") or payload.get("items") or payload
                if isinstance(items, dict):
                    items = [items]
                if not isinstance(items, list):
                    self.message_user(
                        request,
                        "Ожидался JSON массив товаров или один объект товара.",
                        level=messages.ERROR,
                    )
                    return redirect("..")

                with transaction.atomic():
                    for item in items:
                        if not isinstance(item, dict):
                            skipped_count += 1
                            continue

                        name = (item.get("name") or "").strip()
                        if not name:
                            skipped_count += 1
                            continue

                        price = parse_decimal(item.get("price"))
                        if price is None:
                            skipped_count += 1
                            continue

                        code = (item.get("code") or "").strip() or None
                        article = (item.get("article") or "").strip() or None
                        slug = (item.get("slug") or "").strip() or None
                        description = item.get("description") or ""

                        category = resolve_category(item, default_category)
                        if not category:
                            skipped_count += 1
                            continue

                        product = None
                        if code:
                            product = Product.objects.filter(code=code).first()
                        if not product and slug:
                            product = Product.objects.filter(slug=slug).first()
                        if not product:
                            product = Product(category=category, name=name)
                            created = True
                        else:
                            created = False

                        if not slug:
                            slug = slug_from_href(item.get("href"))
                        if not slug:
                            slug = unique_slug(name, product.id if not created else None)
                        else:
                            slug = unique_slug(slug, product.id if not created else None)

                        brand = resolve_brand(item.get("brand"), download_logo=download_images)

                        product.category = category
                        product.brand = brand
                        product.name = name
                        product.slug = slug
                        product.code = code or ""
                        product.article = article or ""
                        product.description = description
                        product.price = price
                        product.retail_price = parse_decimal(item.get("retail_price"))
                        product.discount_percent = int(item.get("discount_percent") or 0)
                        product.min_bonus_price = parse_decimal(item.get("min_bonus_price"))
                        product.show_personal_price_difference = bool(
                            item.get("show_personal_price_difference", True)
                        )
                        product.rating = Decimal(str(item.get("rating") or 0))
                        product.rating_count = int(item.get("rating_count") or 0)
                        product.is_new = bool(item.get("is_new", False))
                        product.is_active = bool(item.get("is_active", True))
                        product.save()

                        if created:
                            created_count += 1
                        else:
                            updated_count += 1

                        attributes = item.get("attributes") or []
                        if attributes:
                            ProductAttribute.objects.filter(product=product).delete()
                            for order, attribute in enumerate(attributes):
                                if not isinstance(attribute, dict):
                                    continue
                                attr_name = (attribute.get("name") or "").strip()
                                value = attribute.get("value")
                                if not attr_name or value is None:
                                    continue
                                attr_obj, _ = Attribute.objects.get_or_create(
                                    name=attr_name,
                                    defaults={
                                        "slug": unique_attribute_slug(attr_name),
                                    },
                                )
                                value_type, val_num, val_bool, val_text = normalize_value(
                                    value
                                )
                                if attr_obj.data_type != value_type:
                                    attr_obj.data_type = value_type
                                    attr_obj.save(update_fields=["data_type"])
                                ProductAttribute.objects.create(
                                    product=product,
                                    attribute=attr_obj,
                                    value_number=val_num,
                                    value_bool=val_bool,
                                    value_text=val_text,
                                    order=order,
                                )

                        if download_images:
                            images = item.get("images") or []
                            image_url = item.get("image")
                            if image_url and not images:
                                images = [{"url": image_url, "is_main": True}]

                            if images:
                                ProductImage.objects.filter(product=product).delete()
                            main_set = False
                            for idx, image in enumerate(images):
                                if not isinstance(image, dict):
                                    continue
                                url = image.get("url") or ""
                                if not url:
                                    continue
                                image_attempts += 1
                                try:
                                    content_bytes, filename = download_image(
                                        url, product.slug, idx
                                    )
                                except Exception as exc:
                                    error_count += 1
                                    if len(image_errors) < 5:
                                        image_errors.append(f"{url}: {exc}")
                                    continue
                                if not main_set:
                                    try:
                                        product.image.save(
                                            filename,
                                            ContentFile(content_bytes),
                                            save=True,
                                        )
                                    except Exception as exc:
                                        error_count += 1
                                        if len(image_errors) < 5:
                                            image_errors.append(
                                                f"{url} (main): {exc}"
                                            )
                                        continue
                                    main_set = True
                                    image_count += 1
                                    continue
                                try:
                                    ProductImage.objects.create(
                                        product=product,
                                        image=ContentFile(content_bytes, name=filename),
                                        alt_text=image.get("alt") or "",
                                        is_main=image.get("is_main", False),
                                        order=idx,
                                    )
                                except Exception as exc:
                                    error_count += 1
                                    if len(image_errors) < 5:
                                        image_errors.append(
                                            f"{url} (extra): {exc}"
                                        )
                                    continue
                                image_count += 1

                error_hint = ""
                if image_errors:
                    error_hint = " Примеры ошибок: " + " | ".join(image_errors)

                self.message_user(
                    request,
                    (
                        f"Импорт завершен. Создано: {created_count}, "
                        f"обновлено: {updated_count}, пропущено: {skipped_count}, "
                        f"ошибок: {error_count}, изображений: {image_count}, "
                        f"попыток загрузки: {image_attempts}."
                        f"{error_hint}"
                    ),
                    level=messages.SUCCESS if error_count == 0 else messages.WARNING,
                )
                return redirect("..")
        else:
            form = ProductImportForm()

        return render(
            request,
            "admin/store/product/import_json.html",
            {"form": form, "title": "Импорт товаров"},
        )


def parse_decimal(value):
    if value is None or value == "":
        return None
    try:
        return Decimal(str(value).replace(" ", "").replace("\xa0", ""))
    except (InvalidOperation, ValueError):
        return None


def unique_slug(base, existing_id):
    base_slug = slugify(str(base), allow_unicode=True)[:200] or "product"
    candidate = base_slug
    index = 1
    while Product.objects.filter(slug=candidate).exclude(id=existing_id).exists():
        index += 1
        suffix = f"-{index}"
        candidate = f"{base_slug[:220 - len(suffix)]}{suffix}"
    return candidate


def resolve_brand(raw_brand, download_logo=False):
    if not raw_brand:
        return None
    name = raw_brand.get("name") if isinstance(raw_brand, dict) else str(raw_brand)
    name = name.strip()
    if not name:
        return None
    slug = slugify(name, allow_unicode=True)[:140] or None
    if not slug:
        return None
    brand, _ = Brand.objects.get_or_create(slug=slug, defaults={"name": name})
    if brand.name != name:
        brand.name = name
        brand.save(update_fields=["name"])
    if download_logo and isinstance(raw_brand, dict):
        logo_url = raw_brand.get("logo")
        if logo_url and not brand.logo:
            try:
                content_bytes, filename = download_image(logo_url, f"brand-{slug}", 0)
                brand.logo.save(
                    filename, ContentFile(content_bytes), save=True
                )
            except Exception:
                pass
    return brand


def resolve_category(item, default_category):
    category_data = None
    if isinstance(item, dict):
        category_data = item.get("category")
        breadcrumbs = item.get("breadcrumbs")
    else:
        breadcrumbs = None

    if isinstance(category_data, dict):
        slug = (category_data.get("slug") or "").strip()
        name = (category_data.get("name") or "").strip()
        if slug:
            category = Category.objects.filter(slug=slug).first()
            if category:
                return category
        if name:
            category = Category.objects.filter(name__iexact=name).first()
            if category:
                return category
    if breadcrumbs:
        created = ensure_category_from_breadcrumbs(breadcrumbs)
        if created:
            return created
    return default_category


def ensure_category_from_breadcrumbs(breadcrumbs):
    if not isinstance(breadcrumbs, list):
        return None
    parent = None
    last_category = None
    for crumb in breadcrumbs:
        if not isinstance(crumb, dict):
            continue
        href = crumb.get("href") or ""
        slug = (crumb.get("slug") or "").strip()
        name = (crumb.get("name") or "").strip()
        if not slug or "/catalog/" not in href:
            continue
        category, created = Category.objects.get_or_create(
            slug=slug,
            defaults={
                "name": name or slug,
                "parent": parent,
                "is_active": True,
            },
        )
        if not created and parent and category.parent_id != parent.id:
            category.parent = parent
            category.save(update_fields=["parent"])
        parent = category
        last_category = category
    return last_category


def slug_from_href(href):
    if not href:
        return None
    path = urllib.parse.urlparse(href).path
    match = re.search(r"/product/([^/]+)/", path)
    if match:
        return match.group(1)
    return None


def unique_attribute_slug(name):
    base_slug = slugify(str(name), allow_unicode=True)[:140] or "attribute"
    candidate = base_slug
    index = 1
    while Attribute.objects.filter(slug=candidate).exclude(name=name).exists():
        index += 1
        suffix = f"-{index}"
        candidate = f"{base_slug[:140 - len(suffix)]}{suffix}"
    return candidate


def normalize_value(value):
    if isinstance(value, bool):
        return Attribute.TYPE_BOOLEAN, None, value, ""
    if isinstance(value, (int, float, Decimal)):
        return Attribute.TYPE_NUMBER, Decimal(str(value)), None, ""
    value_str = str(value).strip()
    if value_str.lower() in {"да", "нет", "true", "false"}:
        bool_value = value_str.lower() in {"да", "true"}
        return Attribute.TYPE_BOOLEAN, None, bool_value, ""
    number = parse_decimal(value_str.replace(",", "."))
    if number is not None:
        return Attribute.TYPE_NUMBER, number, None, ""
    return Attribute.TYPE_TEXT, None, None, value_str


def download_image(url, slug, index):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; BigamImport/1.0)"},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            content = response.read()
    except Exception:
        context = ssl._create_unverified_context()
        with urllib.request.urlopen(request, timeout=30, context=context) as response:
            content = response.read()
    filename = guess_filename(url, slug, index)
    return content, filename


def guess_filename(url, slug, index):
    path = urllib.parse.urlparse(url).path
    extension = Path(path).suffix or ".jpg"
    mime = mimetypes.guess_type(path)[0]
    if mime == "image/png":
        extension = ".png"
    return f"{slug}-{index}{extension}"


@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    list_display = ("name", "data_type", "unit", "is_filterable")
    list_filter = ("data_type", "is_filterable")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("token", "created_at")
    inlines = [CartItemInline]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "status", "customer_name", "total", "created_at")
    list_filter = ("status",)
    search_fields = ("customer_name", "customer_email")
    inlines = [OrderItemInline]


class FAQQuestionInline(admin.TabularInline):
    model = FAQQuestion
    extra = 0


@admin.register(FAQCategory)
class FAQCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [FAQQuestionInline]


@admin.register(FAQQuestion)
class FAQQuestionAdmin(admin.ModelAdmin):
    list_display = ("question", "category", "is_active", "order")
    list_filter = ("is_active", "category")
    search_fields = ("question", "answer")
