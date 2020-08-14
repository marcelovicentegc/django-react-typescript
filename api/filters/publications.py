from django_filters import rest_framework as filters
from backend.models.publications import Publication

class PublicationFilter(filters.FilterSet):
    tag = filters.CharFilter(field_name='tag', lookup_expr='icontains')
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')

    class Meta:
        model = Publication
        fields = ['title', 'tag']