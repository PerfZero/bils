from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0018_product_complectation"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProductComplectation",
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
                ("name", models.CharField(max_length=200, verbose_name="Название")),
                (
                    "quantity",
                    models.CharField(
                        blank=True, max_length=50, verbose_name="Количество"
                    ),
                ),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="complectation_items",
                        to="store.product",
                        verbose_name="Товар",
                    ),
                ),
            ],
            options={
                "verbose_name": "Комплектация товара",
                "verbose_name_plural": "Комплектации товаров",
                "ordering": ["order", "id"],
            },
        ),
    ]
