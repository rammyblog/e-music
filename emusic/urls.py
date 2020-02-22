from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'music', views.MusicViewSet, basename='music')
router.register(r'get/favorite/music',
                views.FavouriteMusicViewset, basename='favmusic')
router.register(r'favorite/music/list',
                views.FavouriteMusicListView, basename='favourite_list')


urlpatterns = [
    path('', include(router.urls)),
    path('favorite/music/', views.favMusic, name='favourite_post'),
    path('favorite/music/<int:pk>', views.favMusic, name='favourite_get')

]
