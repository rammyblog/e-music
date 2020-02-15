import os
from django.conf.urls.static import static
from django.conf import settings


# def handle_uploaded_file(f):

#     ext = os.path.splitext(f.name)[1]
#     print(f)
#     destination = open('{f}%s' % (ext), 'wb+')
#     for chunk in f.chunks():
#         destination.write(chunk)
#     destination.close()
