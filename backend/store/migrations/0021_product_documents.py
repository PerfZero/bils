from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0020_remove_product_complectation"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProductDocument",
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
                ("title", models.CharField(blank=True, max_length=200, verbose_name="Название")),
                ("file", models.FileField(upload_to="products/documents/", verbose_name="Файл")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создан")),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="documents",
                        to="store.product",
                        verbose_name="Товар",
                    ),
                ),
            ],
            options={
                "verbose_name": "Документ товара",
                "verbose_name_plural": "Документы товаров",
                "ordering": ["order", "id"],
            },
        ),
    ]
