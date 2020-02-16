import os
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .serializers import MusicSerializer
from .models import Music, FavMusic
# from .utils import handle_uploaded_file
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.decorators import api_view


class MusicViewSet(viewsets.ModelViewSet):

    queryset = Music.objects.all()
    serializer_class = MusicSerializer

    def create(self, request, *args, **kwargs):

        if request.method == 'POST':
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                # handle_uploaded_file(request.FILES['song'])
                serializer.save()
                return Response(serializer.data)
            else:
                return Response('Invalid data', status=400)


@api_view(['POST'])
def favMusic(request):
    if request.method == 'POST':
        userFavRequest = request.data['favourite']
        try:
            songObj = Music.objects.get(pk=request.data['music'])
        except:
            return Response('The song you are trying to like does not exist', status=400)

        try:
            userFaved = FavMusic.objects.get(user=request.user, music=songObj)
            previousFavouriteDate = userFaved.favourite

            if str(previousFavouriteDate) == userFavRequest:
                return Response('Done that already **winks**')
            else:
                userFaved.favourite = userFavRequest
                userFaved.save()
            if request.data['favourite'] == 'True':
                return Response('{} has been added to favorite'.format(songObj.title))
            else:
                return Response('{} has been removed from favorite'.format(songObj.title))

            return Response('Edited Favourite')

        except FavMusic.DoesNotExist:
            FavMusic.objects.create(
                user=request.user,
                music=songObj,
                favourite=userFavRequest
            )
            return Response('Created Favourite')
    else:
        return Response('Invalid access')

    return Response('Failed Favourite')
