from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0019_product_complectation_items"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="complectation",
        ),
    ]
