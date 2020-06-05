from rest_framework import serializers
from backend.models.subscribers import Subscriber

class SubscribersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ('id', 'name', 'email', 'wpp', 'neighborhood')