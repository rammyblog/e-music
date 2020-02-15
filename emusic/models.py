from django.db import models


class Music(models.Model):
    title = models.CharField(max_length=256, blank=False, null=False)
    artist_name = models.CharField(max_length=256, blank=False, null=False)
    song = models.FileField(
        upload_to='media/', max_length=1000, null=False, blank=False)
    genre = models.CharField(max_length=50)

    class Meta:
        verbose_name = ("Music")
        verbose_name_plural = ("Musics")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("Music_detail", kwargs={"pk": self.pk})
