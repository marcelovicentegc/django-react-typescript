from django.urls import re_path
from rest_framework.authtoken.views import obtain_auth_token
from .views.subscribers import SubscribersEndpoint
from .views.publications import PublicationsEndpoint, PublicationsQueryEndpoint, PaginatedPublicationsQueryEndpoint, PaginatedPublicationsEndpoint, PublicationEndpoint


urlpatterns = [
    re_path(r'^subscribers/$', SubscribersEndpoint.as_view() ),
    re_path(r'^publications/p/$', PaginatedPublicationsEndpoint.as_view() ),
    re_path(r'^publications/filter/$', PublicationsQueryEndpoint.as_view() ),
    re_path(r'^publications/p/filter/$', PaginatedPublicationsQueryEndpoint.as_view()),
    re_path(r'^publications/(?P<slug>[\w\-]+)/$', PublicationEndpoint.as_view()),
    re_path(r'^publications/$', PublicationsEndpoint.as_view() ),
    re_path(r'^authenticate/$', obtain_auth_token)
]