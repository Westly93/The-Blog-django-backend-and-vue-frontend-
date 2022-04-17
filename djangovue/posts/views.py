from django.shortcuts import render
from django.views import View
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .models import Post, Tag
from .serializers import PostSerializer, TagSerializer


class PostViewSet(viewsets.ModelViewSet):
    serializer_class= PostSerializer

    def get_queryset(self):
        posts= Post.objects.all()
        return posts

    def create(self, request, *args, **kwargs):
        data= request.data
        new_post= Post.objects.create(author= request.user, title= data['title'], body= data['body'])
        new_post.save()
        for tag in data['tags']:
            tag_obj= Tag.objects.filter(name= tag).first()
            if tag_obj:
                new_post.tags.add(tag_obj)
            else:
                tag_obj= Tag(name= tag)
                tag_obj.save()
                new_post.tags.add(tag_obj)
        serializer= PostSerializer(new_post)
        return Response(serializer.data)

class TagViewSet(viewsets.ModelViewSet):
    serializer_class= TagSerializer

    def get_queryset(self):
        tags= Tag.objects.all()
        return tags
        
