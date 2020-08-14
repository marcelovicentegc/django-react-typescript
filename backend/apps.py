from django.apps import AppConfig


class BackendConfig(AppConfig):
    name = 'backend'
    verbose_name = 'Public website'

    def ready(self):
        import backend.signals