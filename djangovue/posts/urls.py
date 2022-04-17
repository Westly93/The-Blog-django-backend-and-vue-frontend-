from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, TagViewSet

router= DefaultRouter()

router.register('post', PostViewSet, basename= 'post')
router.register('tag', TagViewSet, basename= 'tag')


urlpatterns= [
    url('', include(router.urls)),
    #path('<str:tag_name>/post/', tag_posts, name= 'tag-posts'),
]