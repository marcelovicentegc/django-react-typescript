from django.contrib import admin
from django.utils.html import format_html
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin
from backend.models.publications import Publication
from backend.actions import ExportCsvMixin
from backend.utils import Strings

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin, DynamicArrayMixin):
    def image_preview(self, obj):
        return format_html('<img src="{}" style="height: 150px" />'.format(obj.image.url))
    
    image_preview.short_description = Strings.IMAGE

    list_filter = ('created_at',)
    list_display = ('title', 'image_preview', 'created_at')
    readonly_fields = ['slug']


    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'body', 'image', 'tag')
        }),
        (Strings.OPTIONAL_FIELDS, {
            'classes': ('collapse',),
            'fields': ('description', 'image_description'),
        }),
    )

