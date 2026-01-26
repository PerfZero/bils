from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0032_leads"),
    ]

    operations = [
        migrations.CreateModel(
            name="SiteSetting",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "site_name",
                    models.CharField(blank=True, max_length=120, verbose_name="Название сайта"),
                ),
                (
                    "logo",
                    models.ImageField(blank=True, upload_to="site/", verbose_name="Логотип"),
                ),
                (
                    "phone",
                    models.CharField(blank=True, max_length=32, verbose_name="Телефон"),
                ),
                (
                    "phone_display",
                    models.CharField(
                        blank=True, max_length=64, verbose_name="Телефон (отображение)"
                    ),
                ),
            ],
            options={
                "verbose_name": "Настройки сайта",
                "verbose_name_plural": "Настройки сайта",
            },
        ),
    ]
