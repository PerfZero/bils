from django.db import migrations, models
import django.db.models.deletion
import django.core.validators


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0021_product_documents"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProductReview",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("author_name", models.CharField(max_length=120, verbose_name="Имя")),
                (
                    "author_email",
                    models.EmailField(blank=True, max_length=254, verbose_name="E-mail"),
                ),
                (
                    "rating",
                    models.PositiveSmallIntegerField(
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(5),
                        ],
                        verbose_name="Оценка",
                    ),
                ),
                ("comment", models.TextField(verbose_name="Комментарий")),
                ("pros", models.TextField(blank=True, verbose_name="Достоинства")),
                ("cons", models.TextField(blank=True, verbose_name="Недостатки")),
                (
                    "is_anonymous",
                    models.BooleanField(default=False, verbose_name="Анонимный отзыв"),
                ),
                ("is_active", models.BooleanField(default=True, verbose_name="Активен")),
                ("likes", models.PositiveIntegerField(default=0, verbose_name="Лайки")),
                (
                    "dislikes",
                    models.PositiveIntegerField(default=0, verbose_name="Дизлайки"),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="Создан"),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reviews",
                        to="store.product",
                        verbose_name="Товар",
                    ),
                ),
            ],
            options={
                "verbose_name": "Отзыв",
                "verbose_name_plural": "Отзывы",
                "ordering": ["-created_at", "id"],
            },
        ),
    ]
