from .models.publications import Publication
from .models.subscribers import Subscriber
from .utils import unique_slug_generator, smart_truncate, format_wpp_number
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from core.settings.base import EMAIL_HOST_USER, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WPP_NUMBER
from string import Template
from twilio.rest import Client

USE_TWILIO = TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN

if USE_TWILIO:
    twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    def send_wpp_message(body, to):
        twilio_client.messages.create(
            body=body,
            from_='whatsapp:{}'.format(TWILIO_WPP_NUMBER),
            to='whatsapp:{}'.format(to)
        )


@receiver(pre_save, sender=Publication)
def populate_slug_field(sender, instance, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


@receiver(post_save, sender=Publication)
def send_newsletter(sender, instance, created, **kwargs):
    if created:
        subscribers_emails = list(Subscriber.objects.filter(contact_method='EMAIL').values_list('contact_info', flat=True))
        
        html_content = render_to_string('backend/email.html', {
            'title': instance.title,
            'description': instance.description,
            'body': smart_truncate(instance.body),
            'slug': instance.slug
        })

        sent = []
        
        for subscriber_email in subscribers_emails:
            if subscriber_email not in sent:
                sent.append(subscriber_email)
                email = EmailMultiAlternatives(
                    'News from Django-React-Typescript: {}'.format(instance.title),
                    None,
                    EMAIL_HOST_USER,
                    [subscriber_email]
                )
                email.attach_alternative(html_content, "text/html")
                email.send()

    if USE_TWILIO:
        for wpp_number in list(Subscriber.objects.filter(contact_method='WHATSAPP').values_list('contact_info', flat=True)):
            if wpp_number not in sent_wpps:
                def get_message_body():
                    if instance.description:
                        return instance.description
                    return smart_truncate(instance.body)

                body = Template('News from Django-React-Typescript: $title\n$body\nLearn more at $link')
                body.substitute(title=instance.title, body=get_message_body(), link='https://www.example.com/blog/{}'.format(instance.slug))

                send_wpp_message(
                    body,
                    format_wpp_number(wpp_number)
                )





