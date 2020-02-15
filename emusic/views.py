import os
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MusicSerializer
from .models import Music
# from .utils import handle_uploaded_file
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser


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
