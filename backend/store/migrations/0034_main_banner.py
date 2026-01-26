from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0033_site_setting"),
    ]

    operations = [
        migrations.CreateModel(
            name="MainBanner",
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
                    "title",
                    models.CharField(blank=True, max_length=200, verbose_name="Название"),
                ),
                ("href", models.CharField(blank=True, max_length=500, verbose_name="Ссылка")),
                (
                    "image",
                    models.ImageField(upload_to="banners/", verbose_name="Изображение"),
                ),
                (
                    "image_desktop",
                    models.ImageField(
                        blank=True, upload_to="banners/", verbose_name="Изображение (десктоп)"
                    ),
                ),
                (
                    "position",
                    models.PositiveIntegerField(default=0, verbose_name="Порядок"),
                ),
                ("is_active", models.BooleanField(default=True, verbose_name="Активен")),
                (
                    "banner_type",
                    models.CharField(
                        choices=[("carousel", "Слайдер"), ("static", "Статичный")],
                        default="carousel",
                        max_length=20,
                        verbose_name="Тип баннера",
                    ),
                ),
                (
                    "show_on_mobile",
                    models.BooleanField(default=True, verbose_name="Показывать на мобиле"),
                ),
                (
                    "show_on_desktop",
                    models.BooleanField(default=True, verbose_name="Показывать на десктопе"),
                ),
                (
                    "advertiser",
                    models.CharField(blank=True, max_length=200, verbose_name="Рекламодатель"),
                ),
                ("ogrn", models.CharField(blank=True, max_length=32, verbose_name="ОГРН")),
                ("token", models.CharField(blank=True, max_length=200, verbose_name="Токен")),
            ],
            options={
                "verbose_name": "Главный баннер",
                "verbose_name_plural": "Главные баннеры",
                "ordering": ["position", "id"],
            },
        ),
    ]
