from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField
from .base import TextBlock
from cloudinary.models import CloudinaryField
from backend.utils import Strings, compress_image
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from urllib.request import urlopen

class Publication(TextBlock):
    image = CloudinaryField(Strings.IMAGE, null=True)
    image_description = models.TextField(
        max_length=500, 
        verbose_name=Strings.IMAGE_DESCRIPTION, 
        help_text=Strings.IMAGE_DESCRIPTION_HELPER, 
        blank=True
    )
    tag = ArrayField(models.CharField(max_length=200), null=True, verbose_name=Strings.KEYWORD)
    slug = models.SlugField(max_length=250, unique=True, null=True)

    def save(self, *args, **kwargs):
        try: 
            self.image = compress_image(self.image)
        except AttributeError:
            img_temp = NamedTemporaryFile(delete=True)
            img_temp.write(urlopen(self.image.url).read())
            img_temp.flush()
            self.image = compress_image(File(img_temp))

        super(Publication, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = Strings.PUBLICATION
        ordering = ['-created_at']