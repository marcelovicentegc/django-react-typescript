# Build frontend
FROM node:20
WORKDIR /usr/src/app
ARG AUTH_TOKEN
ENV AUTH_TOKEN $AUTH_TOKEN
ENV NODE_ENV production
ADD ./frontend/ /usr/src/app/frontend/
RUN npm install -g pnpm
RUN cd frontend \
    && pnpm install \
    && echo $'NODE_ENV=production\nAUTH_TOKEN='$AUTH_TOKEN >> .env \
    && pnpm run build

# Build backend
FROM python:3.12-rc-slim-buster
WORKDIR /usr/src/app
ARG ALLOWED_HOSTS
ENV ALLOWED_HOSTS $ALLOWED_HOSTS
ENV PYTHONDONTWRITEBYTECODE 0
ENV PYTHONUNBUFFERED 0
ENV MODE "production"
RUN apt-get update && \
    apt-get install --no-install-recommends -y build-essential postgresql-common libpq-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip
RUN pip install poetry
COPY ./pyproject.toml /usr/src/app/pyproject.toml
COPY ./poetry.lock /usr/src/app/poetry.lock
RUN poetry install --no-dev
