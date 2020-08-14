from django.urls import path, re_path
from . import views


urlpatterns = [
    re_path(r'^biography$|^blog$|^$', views.index, name='frontend'),
    re_path(r'^blog/(?P<string>.+)$|^$', views.blog_post, name='frontend')
]