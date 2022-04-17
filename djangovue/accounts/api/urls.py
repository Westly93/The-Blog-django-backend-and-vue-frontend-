from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, profile_view, update_profile, author_profile

router= DefaultRouter()
router.register('profile', ProfileViewSet, basename= 'profile')

urlpatterns= [
    path('', include('rest_auth.urls')),
    path('profile/', profile_view, name= 'profile'),
    path('<str:username>/profile/', author_profile, name= 'author-profile'),
    path('profile/update/', update_profile, name= 'update-profile'),
    path('register/', include('rest_auth.registration.urls')),
    path('user/', include(router.urls)),
]