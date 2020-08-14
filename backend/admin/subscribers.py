from django.contrib import admin
from backend.models.subscribers import Subscriber
from backend.actions import ExportCsvMixin


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_filter = ('contact_method', 'created_at')
    actions = ["export_as_csv"]
    search_fields = ['name']
    list_display = ('name', 'contact_info', 'created_at')
    readonly_fields = ['name', 'contact_info', 'contact_method']

    class Media:
        js = ('backend/subscribers.js',)
