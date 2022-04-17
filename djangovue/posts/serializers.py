from rest_framework import serializers
from .models import Post, Tag


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model= Post
        fields= ['author','title', 'body', 'id', 'tags']
        depth= 1

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model= Tag
        fields= ['name']