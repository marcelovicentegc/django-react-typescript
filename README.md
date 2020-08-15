[![License: MIT](https://img.shields.io/github/license/marcelovicentegc/django-react-typescript)](LICENSE)
![Build and Test app](https://github.com/marcelovicentegc/django-react-typescript/workflows/Build%20and%20Test%20app/badge.svg)

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

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Webpack](https://webpack.js.org/)

| Other features              | Status      |
| --------------------------- | ----------- |
| SSR ready                   | In progress |
| Service workers             | ✔️          |
| Gzip static file gen        | ✔️          |
| Cache control               | ✔️          |
| Code split and lazy loading | ✔️          |
| Google Analytics ready      | ✔️          |

### Backend

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- Django CORS Headers

| Other features       | Status |
| -------------------- | ------ |
| Token authentication | ✔️     |
| SMTP ready           | ✔️     |

### Infrastructure

- Docker image with
  - [Memcached](https://memcached.org/)
  - [PostgreSQL](https://www.postgresql.org/)

| Other features                                                                             | Status |
| ------------------------------------------------------------------------------------------ | ------ |
| NGINX config file                                                                          | ✔️     |
| CI/CD to Digital Ocean (the `hml` and `main` branches will trigger the deployment actions) | ✔️     |

### Integrations

- [Sentry](https://sentry.io/welcome/)
- [Cloudinary](https://cloudinary.com/)
- [Twilio](https://www.twilio.com/)
- [Google Analytics](https://analytics.google.com/analytics/web/)

## Development directions

1. Clone this repo: `git clone https://github.com/marcelovicentegc/django-react-typescript.git`
2. Create a virtual environment: `python -m venv venv`
3. Activate it ☝️: `source venv/bin/activate` or `venv\Scripts\activate` if you're on a Windows
4. Install dependencies: `npm i && pip install -r requirements.txt && cd frontend && npm i`
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
