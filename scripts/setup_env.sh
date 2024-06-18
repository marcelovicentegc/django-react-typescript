#!/bin/bash

echo "Creating .env with expected development environment values"

touch .env 
echo "SECRET_KEY=$(base64 /dev/urandom | head -c50)\nDB_HOST=127.0.0.1\nDB_NAME=dev_db\nDB_USER=admin\nDB_PASSWORD=root\nDB_PORT=5432\nSMTP_HOST_USER=\nSMTP_HOST_PASSWORD=\nTEST=" > .env

echo "Done"