import requests
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import StreamingHttpResponse
from wsgiref.util import is_hop_by_hop


class ProxyHttpResponse(StreamingHttpResponse):
    """
    Proxies a response from an upstream server to the client.
    """

    def __init__(self, url, headers=None, **kwargs):
        upstream = requests.get(url, stream=True, headers=headers)

        kwargs.setdefault("content_type", upstream.headers.get("content-type"))
        kwargs.setdefault("status", upstream.status_code)
        kwargs.setdefault("reason", upstream.reason)

        super().__init__(upstream.raw, **kwargs)

        for name, value in upstream.headers.items():
            if not is_hop_by_hop(name):
                self[name] = value


def spa_and_admin_handler(request):
    """
    This view is used to serve the React application and the Django
    admin panel. The React application is served when the request
    path does not start with '/admin', and the Django admin panel
    is served when the request path starts with '/admin'.
    """
    pathname = request.META.get("PATH_INFO", None)

    if pathname.startswith("/admin"):
        return redirect(pathname)

    return render(request, "frontend/index.html")


def frontend_files_handler(request, _):
    """
    This view is used to serve files requested dynamically by the
    React application from the backend server, since the client-side
    code is not aware of where the files are located in the backend
    and expects them to be located on the root.
    """
    pathname = request.META.get("PATH_INFO", None)
    url = request.build_absolute_uri()

    backend_relative_pathname = pathname.replace("/", "/static/frontend/")
    url = url.replace(pathname, backend_relative_pathname)

    print(url)

    return ProxyHttpResponse(url, headers=request.headers)
