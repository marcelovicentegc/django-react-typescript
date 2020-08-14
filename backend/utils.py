import sys
from django.utils.text import slugify
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

class Strings:
    BUTTON_LABEL = "Button's label"
    BUTTON_LINK = "Button's link"
    IMAGE = 'Image'
    IMAGE_DESCRIPTION = 'Image description'
    IMAGE_DESCRIPTION_HELPER = 'Used to help screen readers describe this image to users with compromised vision.'
    TITLE = 'Title'
    BIOGRAPHY = 'Biography'
    SUBTITLE = 'Subtitle'
    DESCRIPTION = 'Description'
    DESCRIPTION_HELPER = "Used to promote this page's content through search engines"
    PREVIEW = ''
    BODY = 'Text body'
    CREATED_AT = 'Created at'
    NAME = 'Name'
    EMAIL = 'Email'
    MESSAGE = 'Message'
    CONTACT = 'Contact'
    CONTACT_METHOD = 'Contact method'
    AGE = 'Age'
    CELLPHONE = 'Cellphone'
    KEYWORD = 'Keyword'
    PUBLICATION = 'Publication'
    ADVANCED_OPTIONS = 'Advanced options'
    OPTIONAL_FIELDS = 'Optional fields'
    SUBSCRIBER = 'Subscriber'


def unique_slug_generator(model_instance):
    slug = slugify(model_instance.title)
    model_class = model_instance.__class__

    while model_class._default_manager.filter(slug=slug).exists():
        object_pk = model_class._default_manager.latest('pk')
        object_pk = object_pk.pk + 1
        slug = f'{slug}-{object_pk}'
    
    return slug


def compress_image(image):
    img = Image.open(image)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    io_stream = BytesIO()
    img.save(io_stream , format='JPEG', quality=60)
    io_stream.seek(0)

    return InMemoryUploadedFile(io_stream,'CloudinaryField', "%s.jpg" % image.name.split('.')[0], 'image/jpeg', sys.getsizeof(io_stream), None)
    

def smart_truncate(content, length=300, suffix='...'):
    if len(content) <= length:
        return content
    else:
        return ' '.join(content[:length+1].split(' ')[0:-1]) + suffix


def format_wpp_number(num):
    if len(num) == 15:
      num = list(num)
      num[5] = ''
      num = ''.join(num)
  
    num = num.replace('(', '')
    num = num.replace(')', '')
    num = num.replace(' ', '')
    return '+55' + num