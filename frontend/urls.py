from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index ),
    re_path(r'^(?:.*)/?$', views.index)
]