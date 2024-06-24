from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^blog$|^$', views.index, name='frontend'),
    re_path(r'^blog/(?P<string>.+)$|^$', views.blog_post, name='frontend'),
    re_path(r'^.*\.js$', views.js_files_handler, name='frontend'),
]