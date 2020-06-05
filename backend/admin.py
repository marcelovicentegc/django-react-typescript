from django.contrib import admin
from .models.subscribers import Subscribers
from .models.biography import Biography
from .models.carrousel import Carrousel

admin.site.register(Subscribers)
admin.site.register(Biography)
admin.site.register(Carrousel)
