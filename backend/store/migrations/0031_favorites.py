from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0030_order_delivery_payment_comment"),
    ]

    operations = [
        migrations.CreateModel(
            name="FavoriteList",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("token", models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создан")),
            ],
            options={
                "verbose_name": "Избранное",
                "verbose_name_plural": "Избранное",
            },
        ),
        migrations.CreateModel(
            name="FavoriteItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создан")),
                ("favorites", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="store.favoritelist", verbose_name="Избранное")),
                ("product", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to="store.product", verbose_name="Товар")),
            ],
            options={
                "verbose_name": "Позиция избранного",
                "verbose_name_plural": "Позиции избранного",
                "ordering": ["-created_at", "-id"],
            },
        ),
        migrations.AddConstraint(
            model_name="favoriteitem",
            constraint=models.UniqueConstraint(fields=("favorites", "product"), name="unique_favorite_product"),
        ),
    ]
