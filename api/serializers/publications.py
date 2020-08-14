from rest_framework import serializers
from backend.models.publications import Publication

class PublicationsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)

    def get_image(self, instance):
        return instance.image.url

    class Meta:
        model = Publication  
        fields = ('title', 'slug', 'description', 'body', 'image', 'tag', 'image_description', 'created_at')
