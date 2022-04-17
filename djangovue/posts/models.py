from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class Tag(models.Model):
    name= models.CharField(max_length= 50, unique= True)


    def __str__(self):
        return self.name

class Post(models.Model):
    author= models.ForeignKey(User, on_delete= models.DO_NOTHING, related_name= 'author')
    title= models.CharField(max_length= 255, unique= True)
    body= models.CharField(max_length= 1000)
    date_posted= models.DateTimeField(auto_now_add= True)
    tags= models.ManyToManyField(Tag, related_name= 'tags')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name= _('Post')
        verbose_name_plural= _('Posts')


