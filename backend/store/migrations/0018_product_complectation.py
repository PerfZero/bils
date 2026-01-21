from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0017_product_description_full"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="complectation",
            field=models.TextField(blank=True, verbose_name="Комплектация"),
        ),
    ]
