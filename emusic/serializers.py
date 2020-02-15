import os
from .models import Music
from rest_framework import serializers


class MusicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Music
        fields = ['title', 'artist_name', 'song', 'genre']

    def validate_song(self, value):
        file = value

        if file:
            if file.size > 4*1024*1024:
                raise serializers.ValidationError('File to large')
            if not os.path.splitext(file.name)[1] in ['.mp3', '.wav']:
                raise serializers.ValidationError(
                    "Doesn't have proper extension")
            return file
        else:
            raise serializers.ValidationError('Not a valid audio file')
