# Generated by Django 2.2.3 on 2020-02-18 11:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('emusic', '0003_favmusic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favmusic',
            name='music',
        ),
        migrations.AddField(
            model_name='favmusic',
            name='song',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='music_list', to='emusic.Music'),
        ),
    ]
