# Generated by Django 3.1.4 on 2022-04-15 15:12

from django.db import migrations
import django_resized.forms


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='thumbnail',
            field=django_resized.forms.ResizedImageField(crop=None, default='media/default.jpg', force_format=None, keep_meta=True, quality=100, size=(100, 100), upload_to='media/profiles'),
        ),
    ]
