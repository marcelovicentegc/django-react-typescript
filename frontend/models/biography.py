from django.db import models
from .base import EnhancedTextBlock

class Biography(EnhancedTextBlock):
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Biography'