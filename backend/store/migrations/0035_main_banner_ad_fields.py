from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0034_main_banner"),
    ]

    operations = [
        migrations.AddField(
            model_name="mainbanner",
            name="advertiser",
            field=models.CharField(blank=True, max_length=200, verbose_name="Рекламодатель"),
        ),
        migrations.AddField(
            model_name="mainbanner",
            name="ogrn",
            field=models.CharField(blank=True, max_length=32, verbose_name="ОГРН"),
        ),
        migrations.AddField(
            model_name="mainbanner",
            name="token",
            field=models.CharField(blank=True, max_length=200, verbose_name="Токен"),
        ),
    ]
