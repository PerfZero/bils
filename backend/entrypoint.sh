#!/bin/sh
set -e

tries=30
until python manage.py migrate --noinput; do
  tries=$((tries - 1))
  if [ $tries -le 0 ]; then
    echo "Database not ready after retries" >&2
    exit 1
  fi
  echo "Database not ready, retrying in 2s..."
  sleep 2
done

exec python manage.py runserver 0.0.0.0:8000
