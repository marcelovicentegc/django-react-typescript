from backend.models.lives import Live
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 

class LiveEndpoint(APIView):
    permission_classes = (IsAuthenticated,)


    def get(self, request, format=None):
        """
        Returns the latest Live object.
        """

        try:
            live = Live.objects.get(site=1)

            formatted_live = {
                'url': live.url,
                'display_from': live.display_from,
                'display_until': live.display_until,
                'on_days': live.on_days,
            }
      
            return Response(formatted_live)
        except Live.DoesNotExist:
            return Response('O link para a live ainda não foi configurado.')