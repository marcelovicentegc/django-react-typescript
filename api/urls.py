from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^subscribers/$', views.SubscribersListCreate.as_view() ),
    re_path(r'^bio/$', views.BiographyEndpoint.as_view() ),
]