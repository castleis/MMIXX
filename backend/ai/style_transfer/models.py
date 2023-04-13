from django.db import models

# Create your models here.
class Music(models.Model):
    music = models.TextField()
    def __str__(self):
        return self.music

class Image(models.Model):
    image = models.TextField()
    def __str__(self):
        return self.image
    