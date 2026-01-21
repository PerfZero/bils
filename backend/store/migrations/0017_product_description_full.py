from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0016_attributes_refactor"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="description_full",
            field=models.TextField(blank=True, verbose_name="Описание для вкладки"),
        ),
    ]
