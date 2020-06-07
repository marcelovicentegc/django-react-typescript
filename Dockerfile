# Pull official base image
FROM python:3.8-slim-buster

# Set work directory
WORKDIR /usr/src/app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 0
ENV PYTHONUNBUFFERED 0
ENV SECRET_KEY $SECRET_KEY
ENV MODE "production"

# Update image
RUN apt-get update && \
    apt-get install --no-install-recommends -y build-essential postgresql-common libpq-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# Copy project
COPY . /usr/src/app/

# Migrate and run app
EXPOSE 8000
CMD ["sh", "-c", "python manage.py migrate && gunicorn institucional.wsgi -b 0.0.0.0:8000"]
