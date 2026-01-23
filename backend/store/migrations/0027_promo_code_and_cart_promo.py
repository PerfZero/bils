from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0026_product_import_log"),
    ]

    operations = [
        migrations.CreateModel(
            name="PromoCode",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("code", models.CharField(db_index=True, max_length=40, unique=True, verbose_name="Код")),
                ("discount_type", models.CharField(choices=[("percent", "Процент"), ("fixed", "Фиксированная сумма")], default="percent", max_length=20, verbose_name="Тип скидки")),
                ("discount_value", models.DecimalField(decimal_places=2, max_digits=10, verbose_name="Значение скидки")),
                ("min_total", models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name="Минимальная сумма")),
                ("is_active", models.BooleanField(default=True, verbose_name="Активен")),
                ("starts_at", models.DateTimeField(blank=True, null=True, verbose_name="Начало")),
                ("ends_at", models.DateTimeField(blank=True, null=True, verbose_name="Окончание")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создан")),
            ],
            options={
                "verbose_name": "Промокод",
                "verbose_name_plural": "Промокоды",
                "ordering": ["-created_at", "code"],
            },
        ),
        migrations.AddField(
            model_name="cart",
            name="promo_code",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="carts", to="store.promocode", verbose_name="Промокод"),
        ),
    ]
