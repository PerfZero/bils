from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0028_product_weight_delivery_payment"),
    ]

    operations = [
        migrations.AddField(
            model_name="deliverymethod",
            name="requires_address",
            field=models.BooleanField(default=False, verbose_name="Требует адрес"),
        ),
        migrations.AddField(
            model_name="deliverymethod",
            name="requires_delivery_date",
            field=models.BooleanField(default=False, verbose_name="Требует дату доставки"),
        ),
    ]
