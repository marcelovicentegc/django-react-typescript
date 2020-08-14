from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from backend.models.publications import Publication
from api.filters.publications import PublicationFilter
from api.serializers.publications import PublicationsSerializer
from api.utils import Pagination
from rest_framework.permissions import IsAuthenticated 

class PaginatedPublicationsEndpoint(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Publication.objects.all()
    serializer_class = PublicationsSerializer
    pagination_class = Pagination

class PublicationsEndpoint(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Publication.objects.all()
    serializer_class = PublicationsSerializer

class PublicationsQueryEndpoint(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Publication.objects.all()
    serializer_class = PublicationsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PublicationFilter

class PaginatedPublicationsQueryEndpoint(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Publication.objects.all()
    serializer_class = PublicationsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PublicationFilter
    pagination_class = Pagination

class PublicationEndpoint(APIView):
    permission_classes = (IsAuthenticated,)


    def get(self, request, format=None, **kwargs):
        """
        Returns the a publication by its slug.
        """

        try:
            publication = Publication.objects.get(slug=kwargs.get('slug'))

            formatted_publication = {
                'title': publication.title,
                'description': publication.description,
                'created_at': publication.created_at,
                'slug': publication.slug,
                'body': publication.body,
                'image': publication.image.url,
            }
      
            return Response(formatted_publication)
        except Publication.DoesNotExist:
            return Response('A publicação ainda não existe.')