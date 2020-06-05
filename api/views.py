from backend.models.subscribers import Subscribers
from .serializers import SubscribersSerializer
from rest_framework import generics

class SubscribersListCreate(generics.ListCreateAPIView):
    queryset = Subscribers.objects.all()
    serializer_class = SubscribersSerializer
