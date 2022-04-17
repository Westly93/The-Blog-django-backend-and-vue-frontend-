from accounts.models import Profile
from rest_framework import serializers

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= Profile
        fields= ['user', 'date_created', 'bio', 'city', 'state', 'address', 'thumbnail']
        depth= 1

        