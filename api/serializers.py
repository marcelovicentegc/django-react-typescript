from rest_framework import serializers
from backend.models.subscribers import Subscriber

class SubscribersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ('id', 'name', 'contact_method', 'contact_info', 'neighborhood')