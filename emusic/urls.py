from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'music', views.MusicViewSet)
# router.register(r'favorite/music/', views.favMusic)


urlpatterns = [
    path('', include(router.urls)),
    path('favorite/music/', views.favMusic, name='favourite')
]
