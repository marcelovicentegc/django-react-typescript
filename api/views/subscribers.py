from backend.models.subscribers import Subscriber
from api.serializers.subscribers import SubscribersSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated 

class SubscribersEndpoint(APIView):
    """
    Interface for users to send their subscription data.
    """
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        serializer = SubscribersSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

