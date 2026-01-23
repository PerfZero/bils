from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0029_delivery_method_requires_fields"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="delivery_method_code",
            field=models.CharField(blank=True, max_length=40, verbose_name="Способ получения"),
        ),
        migrations.AddField(
            model_name="order",
            name="payment_method_code",
            field=models.CharField(blank=True, max_length=40, verbose_name="Способ оплаты"),
        ),
        migrations.AddField(
            model_name="order",
            name="comment",
            field=models.TextField(blank=True, verbose_name="Комментарий"),
        ),
    ]
