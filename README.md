<p align="center">
  <img alt="django-react-typescript logo" src="assets/Logo.png" />
  <p align="center">Your favorite React-Django boilerplate.</p>
</p>

---

## About

This is a fully-featured Django-React boilerplate built for great development experience and easy deployment.

### Global

- Commit lint rules

### Frontend

- React
- Typescript
- React Router
- Styled Components
- React Testing Library
- Webpack

| Other features              | Status |
| --------------------------- | ------ |
| SSR ready                   | ✔️     |
| Service workers             | ✔️     |
| Gzip static file gen        | ✔️     |
| Cache control               | ✔️     |
| Code split and lazy loading | ✔️     |
| Google Analytics ready      | ✔️     |

### Backend

- Django
- Django REST Framework
- Django CORS Headers

| Other features       | Status |
| -------------------- | ------ |
| Token authentication | ✔️     |
| SMTP ready           | ✔️     |

### Infrastructure

- Docker image with
  - Memcached
  - PostgreSQL

| Other features                                                                             | Status |
| ------------------------------------------------------------------------------------------ | ------ |
| NGINX config file                                                                          | ✔️     |
| CI/CD to Digital Ocean (the `hml` and `main` branches will trigger the deployment actions) | ✔️     |

### Integrations

- Sentry
- Cloudinary
- Twilio
- Google Analytics

## Development directions

1. Clone this repo: `git clone https://github.com/marcelovicentegc/django-react-typescript.git`
2. Create a virtual environment: `python -m venv venv`
3. Activate it ☝️: `source venv/bin/activate` or `venv\Scripts\activate` if you're on a Windows
4. Install dependencies: `pip install -r requirements.txt && cd frontend && npm i`
5. Setup the project `.env` file by taking as example the `.env.example` on the root folder (refer to [configuration](#Configuration) for more details)
6. Setup the frontend app's `frontend/.env` file by taking as example the `frontend/.env.example` file (refer to [configuration](#Configuration) for more details)
7. Start the application: `npm start`

## Configuration

You should configure these variables on a `.env` file on the root folder for the global configuration and a `.env` file for the frontend configuration when developing, but for production, set these variables as secrets.

### Global

| Environment variable | Default |
| -------------------- | ------- |
| CDN_NAME             | -       |
| CDN_API_KEY          | -       |
| CDN_API_SECRET       | -       |
| DB_HOST              | -       |
| DB_NAME              | -       |
| DB_USER              | -       |
| DB_PASSWORD          | -       |
| DB_PORT              | -       |
| SMTP_HOST_USER       | -       |
| SMTP_HOST_PASSWORD   | -       |
| TEST                 | -       |
| TWILIO_ACCOUNT_SID   | -       |
| TWILIO_AUTH_TOKEN    | -       |
| TWILIO_WPP_NUMBER    | -       |

### Frontend

| Environment variable | Default     |
| -------------------- | ----------- |
| NODE_ENV             | development |
| AUTH_TOKEN           | -           |
| GTAG_ID              | -           |

## Basic architecture

![Architecture](./assets/Architecture.png)
