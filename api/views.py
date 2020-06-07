from backend.models.subscribers import Subscriber
from backend.models.biography import Biography
from .serializers import SubscribersSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SubscribersListCreate(APIView):
    """
    Interface for users to send their subscription data.
    """
    
    def post(self,request):
        serializer = SubscribersSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BiographyEndpoint(APIView):
    """
    Interface to get the biography set on the Admin side.
    """

    def get(self, request, format=None):
        """
        Returns the last bio object created.
        """

        biography = Biography.objects.latest(
                'created_at')

        formatted_bio = {
            'title': biography.title,
            'subtitle': biography.subtitle,
            'description': biography.description
        }
      
        return Response(formatted_bio)