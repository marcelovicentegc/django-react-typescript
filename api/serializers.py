from rest_framework import serializers
from frontend.models import Subscribers

class SubscribersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribers
        fields = ('id', 'name', 'email', 'wpp', 'neighborhood')