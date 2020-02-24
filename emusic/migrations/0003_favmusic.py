# Generated by Django 2.2.3 on 2020-02-16 01:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('emusic', '0002_auto_20200214_1753'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavMusic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favourite', models.BooleanField(default=False)),
                ('music', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emusic.Music')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'FavMusic',
                'verbose_name_plural': 'FavMusics',
            },
        ),
    ]