# Generated by Django 2.2.28 on 2022-12-13 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_wallet'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wallet',
            name='uuid',
        ),
        migrations.AddField(
            model_name='wallet',
            name='private_key',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
