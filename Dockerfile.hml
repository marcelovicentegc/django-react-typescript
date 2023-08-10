# Build frontend
FROM node:12
WORKDIR /usr/src/app
ARG GTAG_ID
ENV GTAG_ID $GTAG_ID
ARG AUTH_TOKEN
ENV AUTH_TOKEN $AUTH_TOKEN
ENV NODE_ENV production
ADD ./frontend/ /usr/src/app/frontend/
RUN cd frontend \
    && npm ci \
    && echo $'NODE_ENV=production\nAUTH_TOKEN='$AUTH_TOKEN'\nGTAG_ID='$GTAG_ID >> .env \
    && npm run build

# Build Django
FROM python:3.8-slim-buster
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
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt
COPY --from=0 /usr/src/app /usr/src/app
COPY . /usr/src/app/
