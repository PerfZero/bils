import json
import mimetypes
import re
import ssl
import threading
import urllib.request
import urllib.parse
import uuid
from pathlib import Path
from decimal import Decimal, InvalidOperation

from django import forms
from django.contrib import admin, messages
from django.core.cache import cache
from django.core.files.base import ContentFile
from django.db import close_old_connections
from django.db import transaction
from django.http import JsonResponse
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
    ProductComplectation,
    ProductDocument,
    ProductReview,
    ProductImportLog,
    LeadRequest,
    FAQCategory,
    FAQQuestion,
    PromoCode,
    DeliveryMethod,
    PaymentMethod,
    SiteSetting,
    MainBanner,
)


def _group_store_app(app):
    model_map = {model["object_name"]: model for model in app.get("models", [])}
    groups = [
        (
            "Каталог",
            [
                "Category",
                "Brand",
                "Product",
                "Attribute",
                "ProductAttribute",
                "ProductImage",
                "ProductDocument",
                "ProductComplectation",
                "ProductReview",
            ],
        ),
        (
            "Продажи",
            [
                "Order",
                "OrderItem",
                "Cart",
                "CartItem",
                "LeadRequest",
                "PromoCode",
                "DeliveryMethod",
                "PaymentMethod",
                "SiteSetting",
            ],
        ),
        ("Избранное", ["FavoriteList", "FavoriteItem"]),
        ("FAQ", ["FAQCategory", "FAQQuestion"]),
        ("Импорт", ["ProductImportLog"]),
        ("Маркетинг", ["MainBanner"]),
    ]
    grouped = []
    used = set()
    for group_name, model_names in groups:
        models = []
        for name in model_names:
            model = model_map.get(name)
            if model:
                models.append(model)
                used.add(name)
        if models:
            grouped.append(
                {
                    "name": group_name,
                    "app_label": f"store_{slugify(group_name, allow_unicode=True)}",
                    "app_url": app.get("app_url"),
                    "has_module_perms": app.get("has_module_perms", True),
                    "models": models,
                }
            )

    leftovers = [model for key, model in model_map.items() if key not in used]
    if leftovers:
        grouped.append(
            {
                "name": "Прочее",
                "app_label": "store_other",
                "app_url": app.get("app_url"),
                "has_module_perms": app.get("has_module_perms", True),
                "models": leftovers,
            }
        )
    return grouped


if not getattr(admin.site, "_bremax_grouped", False):
    original_get_app_list = admin.site.get_app_list

    def get_grouped_app_list(request):
        app_list = original_get_app_list(request)
        grouped_list = []
        for app in app_list:
            if app.get("app_label") == "store":
                grouped_list.extend(_group_store_app(app))
            else:
                grouped_list.append(app)
        return grouped_list

    admin.site.get_app_list = get_grouped_app_list
    admin.site._bremax_grouped = True


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


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ("site_name", "phone", "phone_display")

    def has_add_permission(self, request):
        return not SiteSetting.objects.exists()


@admin.register(MainBanner)
class MainBannerAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "banner_type",
        "position",
        "is_active",
        "show_on_mobile",
        "show_on_desktop",
    )
    list_filter = ("banner_type", "is_active", "show_on_mobile", "show_on_desktop")
    search_fields = ("title", "href", "advertiser", "ogrn", "token")
    ordering = ("position", "id")


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0


class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    extra = 0
    fields = ("attribute", "value_text", "value_number", "value_bool", "order")


class ProductComplectationInline(admin.TabularInline):
    model = ProductComplectation
    extra = 0
    fields = ("name", "quantity", "order")


class ProductDocumentInline(admin.TabularInline):
    model = ProductDocument
    extra = 0
    fields = ("title", "file", "order")


class ProductReviewInline(admin.TabularInline):
    model = ProductReview
    extra = 0
    fields = (
        "author_name",
        "author_email",
        "rating",
        "is_anonymous",
        "is_active",
        "created_at",
    )
    readonly_fields = ("created_at",)


@admin.register(PromoCode)
class PromoCodeAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "discount_type",
        "discount_value",
        "min_total",
        "is_active",
        "starts_at",
        "ends_at",
    )
    list_filter = ("discount_type", "is_active")
    search_fields = ("code",)


@admin.register(DeliveryMethod)
class DeliveryMethodAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "code",
        "requires_address",
        "requires_delivery_date",
        "is_active",
        "is_default",
        "order",
    )
    list_filter = ("is_active", "is_default", "requires_address", "requires_delivery_date")
    search_fields = ("name", "code")


@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "is_active", "is_default", "order")
    list_filter = ("is_active", "is_default")
    search_fields = ("name", "code")


class ProductImportForm(forms.Form):
    file = forms.FileField(label="JSON файл")
    category = forms.ModelChoiceField(
        queryset=Category.objects.all(),
        label="Категория по умолчанию",
        required=False,
        help_text="Используется, если в JSON нет категории",
    )
    download_images = forms.BooleanField(
        label="Импортировать изображения",
        required=False,
        initial=True,
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
        "weight_kg",
        "is_new",
        "is_active",
        "created_at",
    )
    list_filter = ("is_active", "is_new", "brand", "category")
    search_fields = ("name", "slug", "code", "article")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [
        ProductImageInline,
        ProductAttributeInline,
        ProductComplectationInline,
        ProductDocumentInline,
        ProductReviewInline,
    ]
    change_list_template = "admin/store/product/change_list.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "import-json/",
                self.admin_site.admin_view(self.import_json_view),
                name="store_product_import",
            ),
            path(
                "import-json/status/<uuid:job_id>/",
                self.admin_site.admin_view(self.import_status_view),
                name="store_product_import_status",
            ),
        ]
        return custom_urls + urls

    def _cache_key(self, job_id):
        return f"store_product_import_{job_id}"

    def _update_import_status(self, job_id, payload):
        cache.set(self._cache_key(job_id), payload, timeout=60 * 60)

    def _update_import_log(self, log_id, payload):
        if not log_id:
            return
        ProductImportLog.objects.filter(id=log_id).update(**payload)

    def _process_import(
        self,
        items,
        categories_payload,
        default_category,
        download_images,
        job_id=None,
        log_id=None,
    ):
        created_count = 0
        updated_count = 0
        skipped_count = 0
        error_count = 0
        image_count = 0
        image_attempts = 0
        image_errors = []
        import_errors = []
        skip_errors = []
        processed = 0
        total = len(items)

        def emit():
            if job_id is not None:
                self._update_import_status(
                    job_id,
                    {
                        "status": "running",
                        "processed": processed,
                        "total": total,
                        "created": created_count,
                        "updated": updated_count,
                        "skipped": skipped_count,
                        "errors": error_count,
                        "images": image_count,
                        "image_attempts": image_attempts,
                        "image_errors": image_errors,
                        "import_errors": import_errors,
                        "skip_errors": skip_errors,
                    },
                )
            self._update_import_log(
                log_id,
                {
                    "status": ProductImportLog.STATUS_RUNNING,
                    "processed": processed,
                    "total": total,
                    "created": created_count,
                    "updated": updated_count,
                    "skipped": skipped_count,
                    "errors": error_count,
                    "image_count": image_count,
                    "image_attempts": image_attempts,
                    "image_errors": image_errors,
                    "import_errors": import_errors,
                    "skip_errors": skip_errors,
                },
            )

        if job_id is not None or log_id is not None:
            emit()

        if categories_payload:
            with transaction.atomic():
                import_categories(categories_payload, download_images)
        for item in items:
            processed += 1
            if not isinstance(item, dict):
                skipped_count += 1
                if len(skip_errors) < 10:
                    skip_errors.append("skip: invalid item")
                emit()
                continue

            name = (item.get("name") or "").strip()
            if not name:
                skipped_count += 1
                if len(skip_errors) < 10:
                    skip_errors.append("skip: missing name")
                emit()
                continue

            price = parse_decimal(item.get("price"))
            if price is None:
                skipped_count += 1
                if len(skip_errors) < 10:
                    ref = (item.get("slug") or item.get("href") or name)[:200]
                    skip_errors.append(f"skip: missing price ({ref})")
                emit()
                continue

            code = (item.get("code") or "").strip() or None
            article = (item.get("article") or "").strip() or None
            slug = (item.get("slug") or "").strip() or None
            description = item.get("description") or ""
            description_full = item.get("description_full") or ""
            auto_text = item.get("auto_text") or item.get("autoText") or ""
            tabs_auto_text = item.get("tabs_auto_text") or item.get(
                "tabsAutoText"
            ) or []
            documents_auto_text = item.get("documents_auto_text") or item.get(
                "documentsAutoText"
            ) or ""

            try:
                with transaction.atomic():
                    category = resolve_category(
                        item, default_category, download_images=download_images
                    )
                    if not category:
                        skipped_count += 1
                        if len(skip_errors) < 10:
                            ref = (slug or item.get("href") or name)[:200]
                            skip_errors.append(f"skip: missing category ({ref})")
                        emit()
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

                    brand = resolve_brand(
                        item.get("brand"), download_logo=download_images
                    )

                    product.category = category
                    product.brand = brand
                    product.name = name
                    product.slug = slug
                    product.code = code or ""
                    product.article = article or ""
                    product.description = description
                    product.description_full = description_full
                    product.auto_text = auto_text
                    product.tabs_auto_text = (
                        tabs_auto_text
                        if isinstance(tabs_auto_text, list)
                        else [str(tabs_auto_text)]
                    )
                    product.documents_auto_text = documents_auto_text
                    product.price = price
                    product.retail_price = parse_decimal(item.get("retail_price"))
                    discount_percent = int(item.get("discount_percent") or 0)
                    product.discount_percent = max(0, discount_percent)
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

                    complectation_items = item.get("complectation_items") or []
                    if complectation_items:
                        ProductComplectation.objects.filter(product=product).delete()
                        for order, complectation in enumerate(complectation_items):
                            if not isinstance(complectation, dict):
                                continue
                            item_name = (complectation.get("name") or "").strip()
                            if not item_name:
                                continue
                            ProductComplectation.objects.create(
                                product=product,
                                name=item_name,
                                quantity=(complectation.get("quantity") or "").strip(),
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
                                        filename, ContentFile(content_bytes), save=True
                                    )
                                except Exception as exc:
                                    error_count += 1
                                    if len(image_errors) < 5:
                                        image_errors.append(f"{url} (main): {exc}")
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
                                    image_errors.append(f"{url} (extra): {exc}")
                                continue
                            image_count += 1

                    documents = item.get("documents") or []
                    if documents:
                        ProductDocument.objects.filter(product=product).delete()
                        for order, document in enumerate(documents):
                            if not isinstance(document, dict):
                                continue
                            url = (document.get("url") or document.get("href") or "").strip()
                            if not url:
                                continue
                            try:
                                content_bytes, filename = download_file(url)
                            except Exception as exc:
                                error_count += 1
                                if len(image_errors) < 5:
                                    image_errors.append(f"{url}: {exc}")
                                continue
                            try:
                                ProductDocument.objects.create(
                                    product=product,
                                    title=(document.get("title") or document.get("name") or "").strip(),
                                    file=ContentFile(content_bytes, name=filename),
                                    order=order,
                                )
                            except Exception as exc:
                                error_count += 1
                                if len(image_errors) < 5:
                                    image_errors.append(f"{url} (doc): {exc}")
                                continue
            except Exception as exc:
                error_count += 1
                if len(import_errors) < 10:
                    ref = slug or name
                    import_errors.append(f"{ref}: {exc}")
            emit()

        summary = {
            "created": created_count,
            "updated": updated_count,
            "skipped": skipped_count,
            "errors": error_count,
            "image_count": image_count,
            "image_attempts": image_attempts,
            "image_errors": image_errors,
            "import_errors": import_errors,
            "skip_errors": skip_errors,
        }
        return summary

    def _run_import_job(
        self, job_id, items, categories_payload, default_category, download_images, log_id
    ):
        close_old_connections()
        total = len(items)
        try:
            summary = self._process_import(
                items,
                categories_payload,
                default_category,
                download_images=download_images,
                job_id=job_id,
                log_id=log_id,
            )
            payload = {
                "status": "done",
                "finished": True,
                "processed": total,
                "total": total,
                "created": summary["created"],
                "updated": summary["updated"],
                "skipped": summary["skipped"],
                "errors": summary["errors"],
                "images": summary["image_count"],
                "image_attempts": summary["image_attempts"],
                "image_errors": summary["image_errors"],
                "import_errors": summary.get("import_errors", []),
                "skip_errors": summary.get("skip_errors", []),
                "summary": summary,
            }
            self._update_import_log(
                log_id,
                {
                    "status": ProductImportLog.STATUS_DONE,
                    "processed": total,
                    "total": total,
                    "created": summary["created"],
                    "updated": summary["updated"],
                    "skipped": summary["skipped"],
                    "errors": summary["errors"],
                    "image_count": summary["image_count"],
                    "image_attempts": summary["image_attempts"],
                    "image_errors": summary.get("image_errors", []),
                    "import_errors": summary.get("import_errors", []),
                    "skip_errors": summary.get("skip_errors", []),
                },
            )
        except Exception as exc:
            payload = {
                "status": "error",
                "finished": True,
                "error": str(exc),
            }
            self._update_import_log(
                log_id,
                {"status": ProductImportLog.STATUS_ERROR, "error_message": str(exc)},
            )
        self._update_import_status(job_id, payload)

    def import_status_view(self, request, job_id):
        payload = cache.get(self._cache_key(job_id))
        if not payload:
            return JsonResponse({"status": "missing"}, status=404)
        return JsonResponse(payload)

    def import_json_view(self, request):
        if request.method == "POST":
            form = ProductImportForm(request.POST, request.FILES)
            if form.is_valid():
                default_category = form.cleaned_data["category"]
                download_images = form.cleaned_data.get("download_images", True)

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
                categories_payload = []
                if isinstance(payload, dict):
                    categories_payload = payload.get("categories") or []
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

                uploaded_file = form.cleaned_data.get("file")
                log = ProductImportLog.objects.create(
                    user=request.user if request.user.is_authenticated else None,
                    file_name=getattr(uploaded_file, "name", "") or "",
                    status=ProductImportLog.STATUS_QUEUED,
                    total=len(items),
                )

                if request.headers.get("X-Requested-With") == "XMLHttpRequest":
                    job_id = uuid.uuid4()
                    ProductImportLog.objects.filter(id=log.id).update(
                        job_id=job_id, status=ProductImportLog.STATUS_QUEUED
                    )
                    self._update_import_status(
                        job_id,
                        {
                            "status": "queued",
                            "processed": 0,
                            "total": len(items),
                            "created": 0,
                            "updated": 0,
                            "skipped": 0,
                            "errors": 0,
                            "images": 0,
                            "image_attempts": 0,
                            "image_errors": [],
                            "import_errors": [],
                            "skip_errors": [],
                        },
                    )
                    thread = threading.Thread(
                        target=self._run_import_job,
                        args=(
                            job_id,
                            items,
                            categories_payload,
                            default_category,
                            download_images,
                            log.id,
                        ),
                        daemon=True,
                    )
                    thread.start()
                    return JsonResponse({"job_id": str(job_id)})

                self._update_import_log(
                    log.id,
                    {"status": ProductImportLog.STATUS_RUNNING},
                )
                summary = self._process_import(
                    items,
                    categories_payload,
                    default_category,
                    download_images=download_images,
                    log_id=log.id,
                )

                error_hint = ""
                if summary["image_errors"]:
                    error_hint = " Примеры ошибок: " + " | ".join(
                        summary["image_errors"]
                    )

                self.message_user(
                    request,
                    (
                        f"Импорт завершен. Создано: {summary['created']}, "
                        f"обновлено: {summary['updated']}, пропущено: {summary['skipped']}, "
                        f"ошибок: {summary['errors']}, изображений: {summary['image_count']}, "
                        f"попыток загрузки: {summary['image_attempts']}."
                        f"{error_hint}"
                    ),
                    level=messages.SUCCESS
                    if summary["errors"] == 0
                    else messages.WARNING,
                )
                self._update_import_log(
                    log.id,
                    {
                        "status": ProductImportLog.STATUS_DONE,
                        "processed": len(items),
                        "total": len(items),
                        "created": summary["created"],
                        "updated": summary["updated"],
                        "skipped": summary["skipped"],
                        "errors": summary["errors"],
                        "image_count": summary["image_count"],
                        "image_attempts": summary["image_attempts"],
                        "image_errors": summary.get("image_errors", []),
                        "import_errors": summary.get("import_errors", []),
                        "skip_errors": summary.get("skip_errors", []),
                    },
                )
                return redirect("..")
            if request.headers.get("X-Requested-With") == "XMLHttpRequest":
                return JsonResponse({"errors": form.errors}, status=400)
        else:
            form = ProductImportForm()

        return render(
            request,
            "admin/store/product/import_json.html",
            {"form": form, "title": "Импорт товаров"},
        )


@admin.register(ProductImportLog)
class ProductImportLogAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "status",
        "file_name",
        "user",
        "total",
        "processed",
        "created",
        "updated",
        "skipped",
        "errors",
    )
    list_filter = ("status", "created_at", "user")
    search_fields = ("file_name", "user__username", "user__email")
    readonly_fields = (
        "created_at",
        "updated_at",
        "user",
        "file_name",
        "job_id",
        "status",
        "total",
        "processed",
        "created",
        "updated",
        "skipped",
        "errors",
        "image_count",
        "image_attempts",
        "image_errors",
        "import_errors",
        "skip_errors",
        "error_message",
    )

    def has_add_permission(self, request):
        return False


@admin.register(LeadRequest)
class LeadRequestAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "phone", "email", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("name", "phone", "email", "address")

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


def resolve_category(item, default_category, download_images=False):
    category_data = None
    if isinstance(item, dict):
        category_data = item.get("category")
        breadcrumbs = item.get("breadcrumbs")
    else:
        breadcrumbs = None

    if isinstance(category_data, dict):
        slug = (category_data.get("slug") or "").strip()
        name = (category_data.get("name") or "").strip()
        image_url = category_data.get("image")
        if slug:
            category = Category.objects.filter(slug=slug).first()
            if category:
                maybe_update_category_image(category, image_url, download_images)
                return category
        if name:
            category = Category.objects.filter(name__iexact=name).first()
            if category:
                maybe_update_category_image(category, image_url, download_images)
                return category
    if breadcrumbs:
        created = ensure_category_from_breadcrumbs(breadcrumbs)
        if created:
            image_url = None
            if isinstance(category_data, dict):
                image_url = category_data.get("image")
            maybe_update_category_image(created, image_url, download_images)
            return created
    return default_category


def category_slug_from_href(href):
    if not href:
        return None
    path = urllib.parse.urlparse(href).path
    match = re.search(r"/catalog/([^/]+)/", path)
    if match:
        return match.group(1)
    return None


def import_categories(categories, download_images):
    if not isinstance(categories, list):
        return
    for category_data in categories:
        if not isinstance(category_data, dict):
            continue
        parent = None
        parent_data = category_data.get("parent") if isinstance(category_data, dict) else None
        if isinstance(parent_data, dict):
            parent_slug = (parent_data.get("slug") or "").strip()
            parent_href = parent_data.get("href") or ""
            if not parent_slug and parent_href:
                parent_slug = category_slug_from_href(parent_href) or ""
            parent_name = (parent_data.get("name") or "").strip()
            if parent_slug:
                parent, _ = Category.objects.get_or_create(
                    slug=parent_slug,
                    defaults={
                        "name": parent_name or parent_slug,
                        "is_active": True,
                    },
                )
                if parent_name and parent.name != parent_name:
                    parent.name = parent_name
                    parent.save(update_fields=["name"])
        slug = (category_data.get("slug") or "").strip()
        href = category_data.get("href") or ""
        if not slug and href:
            slug = category_slug_from_href(href) or ""
        name = (category_data.get("name") or "").strip()
        image_url = category_data.get("image")
        if not slug:
            continue
        if parent and parent.slug == slug:
            parent = None
        category, created = Category.objects.get_or_create(
            slug=slug,
            defaults={"name": name or slug, "is_active": True, "parent": parent},
        )
        if name and category.name != name:
            category.name = name
            category.save(update_fields=["name"])
        if parent and category.parent_id != parent.id:
            category.parent = parent
            category.save(update_fields=["parent"])
        maybe_update_category_image(category, image_url, download_images)


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


def maybe_update_category_image(category, image_url, download_images):
    if not download_images or not image_url or category.image:
        return
    try:
        content_bytes, filename = download_image(
            image_url, f"category-{category.slug}", 0
        )
        category.image.save(filename, ContentFile(content_bytes), save=True)
    except Exception:
        pass


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


def download_file(url):
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
    filename = guess_file_name(url)
    return content, filename


def guess_file_name(url):
    path = urllib.parse.urlparse(url).path
    name = Path(path).name
    if not name:
        return "document"
    return name


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
