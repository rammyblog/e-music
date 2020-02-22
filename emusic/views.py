from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .serializers import MusicSerializer, FavouriteMusicSerializer
from .models import Music, FavMusic
# from .utils import handle_uploaded_file
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.decorators import api_view
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django.core import serializers
import django_filters.rest_framework
from rest_framework import filters


class MusicViewSet(viewsets.ModelViewSet):

    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['artist_name', 'title']

    def create(self, request, *args, **kwargs):

        if request.method == 'POST':
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                # handle_uploaded_file(request.FILES['song'])
                serializer.save()
                return Response(serializer.data)
            else:
                return Response('Invalid data', status=400)

    # def get_queryset(self):
    #     favMusicCount = FavMusic.objects.filter(user=self.request.user)
    #     favMusicCountList = [p.id for p in favMusicCount]
    #     favMusicCountQuery = Music.objects.filter(id__in=favMusicCountList)
    #     return favMusicCountQuery.union(self.queryset, all=True)
    #     # return favMusicCount


class FavouriteMusicViewset(viewsets.ModelViewSet):
    serializer_class = FavouriteMusicSerializer

    def get_queryset(self):
        return FavMusic.objects.filter(user=self.request.user)


class FavouriteMusicListView(viewsets.ModelViewSet):
    serializer_class = MusicSerializer

    def get_queryset(self):
        favMusicCount = FavMusic.objects.filter(user=self.request.user)
        favMusicCountList = [p.song.id for p in favMusicCount]
        return Music.objects.filter(id__in=favMusicCountList)


@api_view(['GET', 'POST'])
def favMusic(request, pk=None):
    print(request.data)
    if request.method == 'POST':
        userFavRequest = request.data['favourite']
        try:
            songObj = Music.objects.get(pk=request.data['music'])
        except:
            return Response('The song you are trying to like does not exist', status=400)

        try:
            userFaved = FavMusic.objects.get(user=request.user, song=songObj)
            previousFavouriteDate = userFaved.favourite

            if str(previousFavouriteDate) == userFavRequest:
                return Response('Done that already **winks**')
            else:
                userFaved.favourite = userFavRequest
                if request.data['favourite'] == True:
                    return Response('{} has been added to favorite'.format(songObj.title))
                else:
                    userFaved.delete()
                    return Response('{} has been removed from favorite'.format(songObj.title))

                    # userFaved.save()
                userFaved.save()

            return Response('Edited Favourite')

        except FavMusic.DoesNotExist:
            FavMusic.objects.create(
                user=request.user,
                song=songObj,
                favourite=userFavRequest
            )
            return Response('Created Favourite')

    if request.method == 'GET':
        songObj = Music.objects.get(pk=pk)
        favMusicCount = songObj.music_list.count()

        context = {
            pk: favMusicCount
        }

        return Response(favMusicCount)

    return Response('Failed Favourite')
