from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProfileSerializer
from accounts.models import Profile
from rest_framework import viewsets
from django.contrib.auth.models import User


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class= ProfileSerializer
    def get_queryset(self):
        profiles= Profile.objects.all()
        return profiles

@api_view(['GET'])
def profile_view(request):
    user= request.user
    profile= Profile.objects.get(user= user)
    serializer= ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['PUT'])
def update_profile(request):
    user= request.user
    profile= Profile.objects.get(user= user)
    serializer= ProfileSerializer(instance= profile, data= request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def author_profile(request, username):
    author= User.objects.get(username= username)
    profile= Profile.objects.get(user=author)
    serializer= ProfileSerializer(profile)
    return Response(serializer.data)