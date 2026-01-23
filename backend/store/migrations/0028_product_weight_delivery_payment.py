from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0027_promo_code_and_cart_promo"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="weight_kg",
            field=models.DecimalField(
                blank=True,
                decimal_places=2,
                max_digits=8,
                null=True,
                verbose_name="Вес, кг",
            ),
        ),
        migrations.CreateModel(
            name="DeliveryMethod",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("code", models.CharField(db_index=True, max_length=40, unique=True, verbose_name="Код")),
                ("name", models.CharField(max_length=120, verbose_name="Название")),
                ("description", models.CharField(blank=True, max_length=200, verbose_name="Описание")),
                ("icon", models.CharField(blank=True, max_length=80, verbose_name="Иконка (symbol id)")),
                ("requires_address", models.BooleanField(default=False, verbose_name="Требует адрес")),
                ("requires_delivery_date", models.BooleanField(default=False, verbose_name="Требует дату доставки")),
                ("is_active", models.BooleanField(default=True, verbose_name="Активен")),
                ("is_default", models.BooleanField(default=False, verbose_name="По умолчанию")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
            ],
            options={
                "verbose_name": "Способ получения",
                "verbose_name_plural": "Способы получения",
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="PaymentMethod",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("code", models.CharField(db_index=True, max_length=40, unique=True, verbose_name="Код")),
                ("name", models.CharField(max_length=120, verbose_name="Название")),
                ("description", models.CharField(blank=True, max_length=200, verbose_name="Описание")),
                ("icon", models.CharField(blank=True, max_length=200, verbose_name="Иконка (url)")),
                ("is_active", models.BooleanField(default=True, verbose_name="Активен")),
                ("is_default", models.BooleanField(default=False, verbose_name="По умолчанию")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
            ],
            options={
                "verbose_name": "Способ оплаты",
                "verbose_name_plural": "Способы оплаты",
                "ordering": ["order", "id"],
            },
        ),
    ]
