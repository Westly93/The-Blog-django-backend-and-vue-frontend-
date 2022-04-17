from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django_resized import ResizedImageField
from django.dispatch import receiver
from django.db.models.signals import post_save


class Profile(models.Model):
    user= models.OneToOneField(User, related_name= 'profile', on_delete= models.DO_NOTHING)
    date_created= models.DateTimeField(default= timezone.now)
    thumbnail= ResizedImageField(size= (100, 100), quality= 100, upload_to= 'media/profiles', default= 'media/default.jpg')
    bio= models.TextField(null= True, blank= True)
    city= models.CharField(max_length= 255, null= True, blank= True)
    state= models.CharField(max_length= 255, null= True, blank= True)
    address= models.CharField(max_length= 255, null= True, blank= True)


    class Meta:
        verbose_name= "Profile"
        verbose_name_plural= 'Profiles'

    def __str__(self):
        return f"{self.user.username}'s Profile"
@receiver(post_save, sender= User)
def create_profile(sender, created, instance, *args, **kwargs):
    if created:
        Profile.objects.create(user= instance)

@receiver(post_save, sender= User)
def save_profile(sender, instance, *args, **kwargs):
    instance.profile.save()