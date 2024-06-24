import requests
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import StreamingHttpResponse
from wsgiref.util import is_hop_by_hop

class ProxyHttpResponse(StreamingHttpResponse):
    def __init__(self, url, headers=None, **kwargs):
        upstream = requests.get(url, stream=True, headers=headers)

        kwargs.setdefault('content_type', upstream.headers.get('content-type'))
        kwargs.setdefault('status', upstream.status_code)
        kwargs.setdefault('reason', upstream.reason)

        super().__init__(upstream.raw, **kwargs)

        for name, value in upstream.headers.items():
            if not is_hop_by_hop(name):
                self[name] = value


def index(request):
    pathname = request.META.get('PATH_INFO', None)

    if (pathname == '/admin'):
        return redirect('/admin/')

    return render(request, 'frontend/index.html')


def blog_post(request, string):
    return render(request, 'frontend/index.html')


def js_files_handler(request):
    pathname = request.META.get('PATH_INFO', None)
    url = request.build_absolute_uri()

    backend_relative_pathname = pathname.replace('/', '/static/frontend/')
    url = url.replace(pathname, backend_relative_pathname)

    print(url)

    return ProxyHttpResponse(url, headers=request.headers)