from django.db import models
from backend.utils import Strings, compress_image

class Subscriber(models.Model):
    class ContactMethod(models.TextChoices):
        EMAIL = 'EMAIL', 'E-mail'
        WHATSAPP = 'WHATSAPP', 'Whatsapp'

    name = models.CharField(max_length=100, verbose_name=Strings.NAME)
    contact_method = models.CharField(max_length=300, 
        choices=ContactMethod.choices,
        default=ContactMethod.EMAIL,
        verbose_name=Strings.CONTACT_METHOD
    )
    contact_info = models.CharField(max_length=300, verbose_name=Strings.CONTACT)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=Strings.CREATED_AT)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = Strings.SUBSCRIBER