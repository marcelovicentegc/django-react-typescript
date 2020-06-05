from rest_framework import serializers
from backend.models.subscribers import Subscribers

class SubscribersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribers
        fields = ('id', 'name', 'email', 'wpp', 'neighborhood')