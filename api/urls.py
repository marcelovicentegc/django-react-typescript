from django.urls import path
from . import views

urlpatterns = [
    path('subscribers/', views.SubscribersListCreate.as_view() ),
]