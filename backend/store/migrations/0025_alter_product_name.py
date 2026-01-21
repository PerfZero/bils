from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0024_product_auto_texts"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="name",
            field=models.CharField("Название", max_length=255),
        ),
    ]
