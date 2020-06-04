from django.db import models

class Subscribers(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    wpp = models.CharField(max_length=300)
    neighborhood = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)