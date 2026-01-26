import uuid
from decimal import Decimal, ROUND_HALF_UP
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings
from django.utils import timezone
from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):
    name = models.CharField("Название", max_length=120)
    slug = models.SlugField("Слаг", max_length=140, unique=True)
    description = models.TextField("Описание", blank=True)
    image = models.ImageField("Изображение", upload_to='categories/', blank=True)
    is_popular = models.BooleanField("Популярная на главной", default=False)
    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children',
        verbose_name="Родительская категория"
    )
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Активна", default=True)

    # MPTT fields
    lft = models.PositiveIntegerField(editable=False, null=True)
    rght = models.PositiveIntegerField(editable=False, null=True)
    tree_id = models.PositiveIntegerField(editable=False, null=True)
    level = models.PositiveIntegerField(editable=False, null=True)

    class MPTTMeta:
        order_insertion_by = ['order', 'name']

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField("Название", max_length=120)
    slug = models.SlugField("Слаг", max_length=140, unique=True)
    letter = models.CharField("Буква", max_length=1, blank=True, db_index=True)
    logo = models.ImageField("Логотип", upload_to="brands/", blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Активен", default=True)

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"
        ordering = ["letter", "order", "name"]

    def save(self, *args, **kwargs):
        if not self.letter and self.name:
            self.letter = self.name.strip()[:1].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        related_name="products",
        on_delete=models.PROTECT,
        verbose_name="Категория",
    )
    brand = models.ForeignKey(
        Brand,
        related_name="products",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Бренд",
    )
    code = models.CharField("Код", max_length=50, blank=True)
    article = models.CharField("Артикул", max_length=50, blank=True)
    name = models.CharField("Название", max_length=255)
    slug = models.SlugField("Слаг", max_length=220, unique=True)
    description = models.TextField("Описание", blank=True)
    description_full = models.TextField("Описание для вкладки", blank=True)
    auto_text = models.TextField("Автотекст", blank=True)
    tabs_auto_text = models.JSONField("Автотекст вкладок", blank=True, default=list)
    documents_auto_text = models.TextField("Текст документов", blank=True)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2)
    retail_price = models.DecimalField(
        "Розничная цена", max_digits=10, decimal_places=2, blank=True, null=True
    )
    discount_percent = models.PositiveSmallIntegerField("Скидка, %", default=0)
    min_bonus_price = models.DecimalField(
        "Минимальная цена с бонусами", max_digits=10, decimal_places=2, blank=True, null=True
    )
    show_personal_price_difference = models.BooleanField(
        "Показывать разницу персональной цены", default=True
    )
    image = models.ImageField("Изображение", upload_to="products/", blank=True)
    rating = models.DecimalField(
        "Рейтинг", max_digits=3, decimal_places=1, default=0
    )
    rating_count = models.PositiveIntegerField("Количество оценок", default=0)
    is_new = models.BooleanField("Новинка", default=False)
    is_active = models.BooleanField("Активен", default=True)
    weight_kg = models.DecimalField(
        "Вес, кг", max_digits=8, decimal_places=2, null=True, blank=True
    )
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return self.name


class ProductImportLog(models.Model):
    STATUS_QUEUED = "queued"
    STATUS_RUNNING = "running"
    STATUS_DONE = "done"
    STATUS_ERROR = "error"

    STATUS_CHOICES = [
        (STATUS_QUEUED, "В очереди"),
        (STATUS_RUNNING, "Выполняется"),
        (STATUS_DONE, "Завершен"),
        (STATUS_ERROR, "Ошибка"),
    ]

    created_at = models.DateTimeField("Создан", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлен", auto_now=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="product_import_logs",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Пользователь",
    )
    file_name = models.CharField("Файл", max_length=255, blank=True)
    job_id = models.UUIDField("ID задачи", null=True, blank=True, db_index=True)
    status = models.CharField(
        "Статус", max_length=20, choices=STATUS_CHOICES, default=STATUS_QUEUED
    )
    total = models.PositiveIntegerField("Всего", default=0)
    processed = models.PositiveIntegerField("Обработано", default=0)
    created = models.PositiveIntegerField("Создано", default=0)
    updated = models.PositiveIntegerField("Обновлено", default=0)
    skipped = models.PositiveIntegerField("Пропущено", default=0)
    errors = models.PositiveIntegerField("Ошибок", default=0)
    image_count = models.PositiveIntegerField("Изображений", default=0)
    image_attempts = models.PositiveIntegerField("Попыток загрузки", default=0)
    image_errors = models.JSONField("Ошибки изображений", default=list, blank=True)
    import_errors = models.JSONField("Ошибки импорта", default=list, blank=True)
    skip_errors = models.JSONField("Причины пропусков", default=list, blank=True)
    error_message = models.TextField("Ошибка", blank=True)

    class Meta:
        verbose_name = "Лог импорта товаров"
        verbose_name_plural = "Логи импорта товаров"
        ordering = ["-created_at", "-id"]

    def __str__(self):
        return f"Импорт {self.created_at:%Y-%m-%d %H:%M:%S}"


class ProductComplectation(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="complectation_items",
        on_delete=models.CASCADE,
        verbose_name="Товар",
    )
    name = models.CharField("Название", max_length=200)
    quantity = models.CharField("Количество", max_length=50, blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        verbose_name = "Комплектация товара"
        verbose_name_plural = "Комплектации товаров"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.product}: {self.name}"


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="images",
        on_delete=models.CASCADE,
        verbose_name="Товар",
    )
    image = models.ImageField("Изображение", upload_to="products/")
    alt_text = models.CharField("Alt текст", max_length=200, blank=True)
    is_main = models.BooleanField("Основное", default=False)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        verbose_name = "Изображение товара"
        verbose_name_plural = "Изображения товаров"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.product} ({self.order})"


class ProductDocument(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="documents",
        on_delete=models.CASCADE,
        verbose_name="Товар",
    )
    title = models.CharField("Название", max_length=200, blank=True)
    file = models.FileField("Файл", upload_to="products/documents/")
    order = models.PositiveIntegerField("Порядок", default=0)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Документ товара"
        verbose_name_plural = "Документы товаров"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.product}: {self.title or self.file.name}"


class ProductReview(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="reviews",
        on_delete=models.CASCADE,
        verbose_name="Товар",
    )
    author_name = models.CharField("Имя", max_length=120)
    author_email = models.EmailField("E-mail", blank=True)
    rating = models.PositiveSmallIntegerField(
        "Оценка",
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    comment = models.TextField("Комментарий")
    pros = models.TextField("Достоинства", blank=True)
    cons = models.TextField("Недостатки", blank=True)
    is_anonymous = models.BooleanField("Анонимный отзыв", default=False)
    is_active = models.BooleanField("Активен", default=True)
    likes = models.PositiveIntegerField("Лайки", default=0)
    dislikes = models.PositiveIntegerField("Дизлайки", default=0)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ["-created_at", "id"]

    def __str__(self):
        return f"{self.product}: {self.author_name} ({self.rating})"


class Attribute(models.Model):
    TYPE_TEXT = "text"
    TYPE_NUMBER = "number"
    TYPE_BOOLEAN = "boolean"

    TYPE_CHOICES = [
        (TYPE_TEXT, "Текст"),
        (TYPE_NUMBER, "Число"),
        (TYPE_BOOLEAN, "Да/Нет"),
    ]

    name = models.CharField("Название", max_length=120, unique=True)
    slug = models.SlugField("Слаг", max_length=140, unique=True)
    data_type = models.CharField(
        "Тип данных", max_length=20, choices=TYPE_CHOICES, default=TYPE_TEXT
    )
    unit = models.CharField("Единица измерения", max_length=40, blank=True)
    is_filterable = models.BooleanField("Фильтруется", default=True)

    class Meta:
        verbose_name = "Атрибут"
        verbose_name_plural = "Атрибуты"
        ordering = ["name"]

    def __str__(self):
        return self.name


class ProductAttribute(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="attributes",
        on_delete=models.CASCADE,
        verbose_name="Товар",
    )
    attribute = models.ForeignKey(
        Attribute,
        related_name="product_attributes",
        on_delete=models.PROTECT,
        verbose_name="Атрибут",
    )
    value_text = models.CharField("Текстовое значение", max_length=200, blank=True)
    value_number = models.DecimalField(
        "Числовое значение", max_digits=12, decimal_places=3, blank=True, null=True
    )
    value_bool = models.BooleanField("Булево значение", blank=True, null=True)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        verbose_name = "Характеристика товара"
        verbose_name_plural = "Характеристики товаров"
        ordering = ["order", "id"]

    def __str__(self):
        value = None
        if self.value_number is not None:
            value = self.value_number
        elif self.value_bool is not None:
            value = self.value_bool
        else:
            value = self.value_text
        return f"{self.attribute}: {value}"


class Cart(models.Model):
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    promo_code = models.ForeignKey(
        "PromoCode",
        related_name="carts",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Промокод",
    )
    created_at = models.DateTimeField("Создана", auto_now_add=True)

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"

    def __str__(self):
        return str(self.token)


class FavoriteList(models.Model):
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Избранное"
        verbose_name_plural = "Избранное"

    def __str__(self):
        return str(self.token)


class LeadRequest(models.Model):
    STATUS_NEW = "new"
    STATUS_PROCESSED = "processed"

    STATUS_CHOICES = [
        (STATUS_NEW, "Новая"),
        (STATUS_PROCESSED, "Обработана"),
    ]

    name = models.CharField("Ваше имя", max_length=120)
    address = models.CharField("Ваш адрес", max_length=200)
    email = models.EmailField("Ваш Email")
    phone = models.CharField("Ваш телефон", max_length=40)
    comment = models.TextField("Комментарий", blank=True)
    status = models.CharField(
        "Статус", max_length=20, choices=STATUS_CHOICES, default=STATUS_NEW
    )
    created_at = models.DateTimeField("Создана", auto_now_add=True)

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"
        ordering = ["-created_at", "-id"]

    def __str__(self):
        return f"Заявка #{self.id}"


class PromoCode(models.Model):
    TYPE_PERCENT = "percent"
    TYPE_FIXED = "fixed"

    TYPE_CHOICES = [
        (TYPE_PERCENT, "Процент"),
        (TYPE_FIXED, "Фиксированная сумма"),
    ]

    code = models.CharField("Код", max_length=40, unique=True, db_index=True)
    discount_type = models.CharField(
        "Тип скидки", max_length=20, choices=TYPE_CHOICES, default=TYPE_PERCENT
    )
    discount_value = models.DecimalField(
        "Значение скидки", max_digits=10, decimal_places=2
    )
    min_total = models.DecimalField(
        "Минимальная сумма", max_digits=10, decimal_places=2, default=0
    )
    is_active = models.BooleanField("Активен", default=True)
    starts_at = models.DateTimeField("Начало", null=True, blank=True)
    ends_at = models.DateTimeField("Окончание", null=True, blank=True)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Промокод"
        verbose_name_plural = "Промокоды"
        ordering = ["-created_at", "code"]

    def __str__(self):
        return self.code

    def is_valid_for_total(self, total):
        now = timezone.now()
        if not self.is_active:
            return False
        if self.starts_at and self.starts_at > now:
            return False
        if self.ends_at and self.ends_at < now:
            return False
        if total < self.min_total:
            return False
        return True

    def calculate_discount(self, total):
        if not self.is_valid_for_total(total):
            return 0
        if self.discount_type == self.TYPE_FIXED:
            amount = min(self.discount_value, total)
            return amount.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        percent = max(self.discount_value, 0)
        amount = (total * percent) / 100
        return amount.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


class DeliveryMethod(models.Model):
    code = models.CharField("Код", max_length=40, unique=True, db_index=True)
    name = models.CharField("Название", max_length=120)
    description = models.CharField("Описание", max_length=200, blank=True)
    icon = models.CharField("Иконка (symbol id)", max_length=80, blank=True)
    requires_address = models.BooleanField("Требует адрес", default=False)
    requires_delivery_date = models.BooleanField("Требует дату доставки", default=False)
    is_active = models.BooleanField("Активен", default=True)
    is_default = models.BooleanField("По умолчанию", default=False)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        verbose_name = "Способ получения"
        verbose_name_plural = "Способы получения"
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class PaymentMethod(models.Model):
    code = models.CharField("Код", max_length=40, unique=True, db_index=True)
    name = models.CharField("Название", max_length=120)
    description = models.CharField("Описание", max_length=200, blank=True)
    icon = models.CharField("Иконка (url)", max_length=200, blank=True)
    is_active = models.BooleanField("Активен", default=True)
    is_default = models.BooleanField("По умолчанию", default=False)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        verbose_name = "Способ оплаты"
        verbose_name_plural = "Способы оплаты"
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class SiteSetting(models.Model):
    site_name = models.CharField("Название сайта", max_length=120, blank=True)
    logo = models.ImageField("Логотип", upload_to="site/", blank=True)
    phone = models.CharField("Телефон", max_length=32, blank=True)
    phone_display = models.CharField("Телефон (отображение)", max_length=64, blank=True)

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"

    def __str__(self):
        return self.site_name or "Настройки сайта"


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart, related_name="items", on_delete=models.CASCADE, verbose_name="Корзина"
    )
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, verbose_name="Товар"
    )
    quantity = models.PositiveIntegerField("Количество", default=1)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Позиция корзины"
        verbose_name_plural = "Позиции корзины"

    def __str__(self):
        return f"{self.product} x {self.quantity}"


class FavoriteItem(models.Model):
    favorites = models.ForeignKey(
        FavoriteList,
        related_name="items",
        on_delete=models.CASCADE,
        verbose_name="Избранное",
    )
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, verbose_name="Товар"
    )
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Позиция избранного"
        verbose_name_plural = "Позиции избранного"
        ordering = ["-created_at", "-id"]
        constraints = [
            models.UniqueConstraint(
                fields=["favorites", "product"], name="unique_favorite_product"
            )
        ]

    def __str__(self):
        return f"{self.product} (favorite)"


class Order(models.Model):
    STATUS_NEW = "new"
    STATUS_PAID = "paid"
    STATUS_SHIPPED = "shipped"
    STATUS_CANCELLED = "cancelled"

    STATUS_CHOICES = [
        (STATUS_NEW, "Новый"),
        (STATUS_PAID, "Оплачен"),
        (STATUS_SHIPPED, "Отправлен"),
        (STATUS_CANCELLED, "Отменен"),
    ]

    status = models.CharField(
        "Статус", max_length=20, choices=STATUS_CHOICES, default=STATUS_NEW
    )
    customer_name = models.CharField("Имя", max_length=120)
    customer_email = models.EmailField("Email")
    customer_phone = models.CharField("Телефон", max_length=40, blank=True)
    address_line = models.CharField("Адрес", max_length=200)
    city = models.CharField("Город", max_length=80)
    postal_code = models.CharField("Индекс", max_length=20, blank=True)
    delivery_method_code = models.CharField(
        "Способ получения", max_length=40, blank=True
    )
    payment_method_code = models.CharField(
        "Способ оплаты", max_length=40, blank=True
    )
    comment = models.TextField("Комментарий", blank=True)
    total = models.DecimalField("Сумма", max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return f"Заказ #{self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name="items", on_delete=models.CASCADE, verbose_name="Заказ"
    )
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, verbose_name="Товар"
    )
    quantity = models.PositiveIntegerField("Количество", default=1)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Позиция заказа"
        verbose_name_plural = "Позиции заказа"

    def __str__(self):
        return f"{self.product} x {self.quantity}"


class FAQCategory(models.Model):
    name = models.CharField("Название категории", max_length=120)
    slug = models.SlugField("Слаг", max_length=140, unique=True)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        verbose_name = "FAQ категория"
        verbose_name_plural = "FAQ категории"
        ordering = ['order']

    def __str__(self):
        return self.name


class FAQQuestion(models.Model):
    category = models.ForeignKey(
        FAQCategory,
        related_name="questions",
        on_delete=models.CASCADE,
        verbose_name="Категория"
    )
    question = models.TextField("Вопрос")
    answer = models.TextField("Ответ")
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Активен", default=True)
    created_at = models.DateTimeField("Создан", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлен", auto_now=True)

    class Meta:
        verbose_name = "FAQ вопрос"
        verbose_name_plural = "FAQ вопросы"
        ordering = ['order']

    def __str__(self):
        return self.question[:100]
