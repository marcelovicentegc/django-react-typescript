from django.db import models
from backend.utils import Strings
from django.contrib.sites.models import Site
from django_better_admin_arrayfield.models.fields import ArrayField


class ButtonBlock(models.Model):
    button_label = models.CharField(
        max_length=120, verbose_name=Strings.BUTTON_LABEL)
    button_url = models.CharField(max_length=120, verbose_name=Strings.BUTTON_LINK, blank=True, null=True)

    class Meta:
        abstract = True


class TextBlockBase(models.Model):
    title = models.CharField(max_length=120, verbose_name=Strings.TITLE)
    body = models.TextField(max_length=30000, verbose_name=Strings.BODY, default='')
    description = models.TextField(
        max_length=3000, 
        verbose_name=Strings.DESCRIPTION, 
        help_text=Strings.DESCRIPTION_HELPER,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=Strings.CREATED_AT)

    def __str__(self):
        return self.title

    class Meta:
        abstract = True


class TextBlock(TextBlockBase):
    class Meta:
        abstract = True


class EnhancedTextBlock(TextBlockBase, ButtonBlock):
    subtitle = models.CharField(max_length=120, verbose_name=Strings.SUBTITLE)

    class Meta:
        abstract = True
