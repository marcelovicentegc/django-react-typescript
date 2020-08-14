import os

AH = os.environ.get('ALLOWED_HOSTS')

if AH:
    ALLOWED_HOSTS = AH.split(' ')

DEBUG = False

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
USE_X_FORWARDED_PORT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


# Sentry 

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

SENTRY_DNS = os.environ.get('SENTRY_DNS')

sentry_sdk.init(
    dsn=SENTRY_DNS,
    integrations=[DjangoIntegration()],

    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True
)

# Django CORS Headers

CORS_ORIGIN_WHITELIST = [
    'https://example.com',
    'https://www.example.com',
]

# DRF

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
}

# Memcached and pylibmc

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}