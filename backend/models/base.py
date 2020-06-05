from django.db import models


class ButtonBlock(models.Model):
    button_label = models.CharField(
        max_length=120, verbose_name="Button's label")
    button_url = models.CharField(max_length=120, verbose_name="Button's link")

    class Meta:
        abstract = True


class TextBlockBase(models.Model):
    title = models.CharField(max_length=120, verbose_name='Title')
    description = models.TextField(max_length=3000, verbose_name='Description')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        abstract = True


class TextBlock(TextBlockBase):
    class Meta:
        abstract = True


class EnhancedTextBlock(TextBlockBase, ButtonBlock):
    subtitle = models.CharField(max_length=120, verbose_name='Subtitle')
    body = models.CharField(max_length=30000, verbose_name='Body')

    class Meta:
        abstract = True
