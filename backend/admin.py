from django.contrib import admin
from .models.subscribers import Subscriber
from .models.biography import Biography
from .models.carrousel import CarrouselItem
from .models.publications import Publication

admin.site.register(Subscriber)
admin.site.register(Biography)
admin.site.register(CarrouselItem)
admin.site.register(Publication)