from django.shortcuts import render
from core.settings.base import PRODUCTION_MODE
from django.shortcuts import redirect


def index(request):
    endpoint = request.META.get('PATH_INFO', None)

    if (endpoint == '/admin'):
        return redirect('/admin/')

    return render(request, 'frontend/index.html')


def blog_post(request, string):
    return render(request, 'frontend/index.html')