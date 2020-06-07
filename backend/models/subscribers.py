from django.db import models


class Subscriber(models.Model):
    class ContactMethod(models.TextChoices):
        EMAIL = 'EMAIL', 'E-mail'
        WHATSAPP = 'WHATSAPP', 'Whatsapp'

    name = models.CharField(max_length=100)
    contact_method = models.CharField(max_length=300, 
        choices=ContactMethod.choices,
        default=ContactMethod.EMAIL,
        verbose_name='Contact method'
    )
    contact_info = models.CharField(max_length=300)
    neighborhood = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
