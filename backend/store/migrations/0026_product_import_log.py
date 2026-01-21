from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0025_alter_product_name"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="ProductImportLog",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создан")),
                ("updated_at", models.DateTimeField(auto_now=True, verbose_name="Обновлен")),
                ("file_name", models.CharField(blank=True, max_length=255, verbose_name="Файл")),
                ("job_id", models.UUIDField(blank=True, db_index=True, null=True, verbose_name="ID задачи")),
                ("status", models.CharField(choices=[("queued", "В очереди"), ("running", "Выполняется"), ("done", "Завершен"), ("error", "Ошибка")], default="queued", max_length=20, verbose_name="Статус")),
                ("total", models.PositiveIntegerField(default=0, verbose_name="Всего")),
                ("processed", models.PositiveIntegerField(default=0, verbose_name="Обработано")),
                ("created", models.PositiveIntegerField(default=0, verbose_name="Создано")),
                ("updated", models.PositiveIntegerField(default=0, verbose_name="Обновлено")),
                ("skipped", models.PositiveIntegerField(default=0, verbose_name="Пропущено")),
                ("errors", models.PositiveIntegerField(default=0, verbose_name="Ошибок")),
                ("image_count", models.PositiveIntegerField(default=0, verbose_name="Изображений")),
                ("image_attempts", models.PositiveIntegerField(default=0, verbose_name="Попыток загрузки")),
                ("image_errors", models.JSONField(blank=True, default=list, verbose_name="Ошибки изображений")),
                ("import_errors", models.JSONField(blank=True, default=list, verbose_name="Ошибки импорта")),
                ("skip_errors", models.JSONField(blank=True, default=list, verbose_name="Причины пропусков")),
                ("error_message", models.TextField(blank=True, verbose_name="Ошибка")),
                ("user", models.ForeignKey(blank=True, null=True, on_delete=models.SET_NULL, related_name="product_import_logs", to=settings.AUTH_USER_MODEL, verbose_name="Пользователь")),
            ],
            options={
                "verbose_name": "Лог импорта товаров",
                "verbose_name_plural": "Логи импорта товаров",
                "ordering": ["-created_at", "-id"],
            },
        ),
    ]
