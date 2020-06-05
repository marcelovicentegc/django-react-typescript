from django.db import models
from .base import TextBlock, ButtonBlock


class CarrouselItem(TextBlock, ButtonBlock):
    class Position(models.TextChoices):
        TOP_CENTER = 'TOP_CENTER', 'At the top center'
        TOP_LEFT = 'TOP_LEFT', 'At the top left'
        TOP_RIGHT = 'TOP_RIGHT', 'At the top right'
        BOTTOM_CENTER = 'BOTTOM_CENTER', 'At the bottom center'
        BOTTOM_LEFT = 'BOTTOM_LEFT', 'At the bottom left'
        BOTTOM_RIGHT = 'BOTTOM_RIGHT', 'At the bottom right'
        CENTER = 'CENTER', 'Centered'
        CENTER_LEFT = 'CENTER_LEFT', 'Centered left'
        CENTER_RIGHT = 'CENTER_RIGHT', 'Centered right'

    position = models.CharField(
        max_length=13,
        choices=Position.choices,
        default=Position.CENTER,
        verbose_name='Text position'
    )
    image = models.ImageField(
        upload_to='img', null=True, blank=True, verbose_name='Image')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Carrousel item'
