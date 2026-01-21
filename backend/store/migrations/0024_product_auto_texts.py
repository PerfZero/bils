from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0023_product_documents_auto_text"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="auto_text",
            field=models.TextField(blank=True, verbose_name="Автотекст"),
        ),
        migrations.AddField(
            model_name="product",
            name="tabs_auto_text",
            field=models.JSONField(blank=True, default=list, verbose_name="Автотекст вкладок"),
        ),
    ]
