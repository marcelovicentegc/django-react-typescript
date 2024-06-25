from .models.publications import Publication
from .models.subscribers import Subscriber
from .utils import unique_slug_generator, smart_truncate
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from core.settings.base import (
    EMAIL_HOST_USER,
)


@receiver(pre_save, sender=Publication)
def populate_slug_field(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


@receiver(post_save, sender=Publication)
def send_newsletter(sender, instance, created, **kwargs):
    if created:
        subscribers_emails = list(
            Subscriber.objects.filter(contact_method="EMAIL").values_list(
                "contact_info", flat=True
            )
        )

        html_content = render_to_string(
            "backend/email.html",
            {
                "title": instance.title,
                "description": instance.description,
                "body": smart_truncate(instance.body),
                "slug": instance.slug,
            },
        )

        sent = []

        for subscriber_email in subscribers_emails:
            if subscriber_email not in sent:
                sent.append(subscriber_email)
                email = EmailMultiAlternatives(
                    "News from Django-React-Typescript: {}".format(instance.title),
                    None,
                    EMAIL_HOST_USER,
                    [subscriber_email],
                )
                email.attach_alternative(html_content, "text/html")
                email.send()
