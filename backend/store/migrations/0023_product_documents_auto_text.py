from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0022_product_reviews"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="documents_auto_text",
            field=models.TextField(blank=True, verbose_name="Текст документов"),
        ),
    ]
