from backend.models.subscribers import Subscriber
from .serializers import SubscribersSerializer
from rest_framework import generics

class SubscribersListCreate(generics.ListCreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscribersSerializer
