"""es URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import re_path, include
from core.settings.base import STATIC_ROOT, MEDIA_ROOT
from django.views.static import serve

admin.site.site_header = "Django-React-Typescript Admin"
admin.site.site_title = "Django-React-Typescript Admin"
admin.site.index_title = "Modules"

def trigger_error(request):
    division_by_zero = 1 / 0

urlpatterns = [
    re_path(r'^sentry-debug/', trigger_error),
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^api/', include('api.urls')),
    re_path(r'^static/(?P<path>.*)$', serve, { 'document_root' : STATIC_ROOT, }), 
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': MEDIA_ROOT,
    }),
    re_path(r'^', include('frontend.urls')),
]
