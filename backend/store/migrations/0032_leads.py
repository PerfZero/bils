from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0031_favorites"),
    ]

    operations = [
        migrations.CreateModel(
            name="LeadRequest",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120, verbose_name="Ваше имя")),
                ("address", models.CharField(max_length=200, verbose_name="Ваш адрес")),
                ("email", models.EmailField(max_length=254, verbose_name="Ваш Email")),
                ("phone", models.CharField(max_length=40, verbose_name="Ваш телефон")),
                ("comment", models.TextField(blank=True, verbose_name="Комментарий")),
                ("status", models.CharField(choices=[("new", "Новая"), ("processed", "Обработана")], default="new", max_length=20, verbose_name="Статус")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создана")),
            ],
            options={
                "verbose_name": "Заявка",
                "verbose_name_plural": "Заявки",
                "ordering": ["-created_at", "-id"],
            },
        ),
    ]
