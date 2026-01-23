# MMS Shop

Интернет-магазин на Django (API) и Next.js (frontend), упакованный в Docker.

## Стек

- Backend: Django + DRF + PostgreSQL
- Frontend: Next.js 14
- Контейнеризация: Docker Compose

## Структура

- `backend/` - Django-приложение и API
- `frontend/` - клиент на Next.js
- `scripts/` - парсеры и утилиты

## Быстрый старт (локально)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/products/
- Админка: http://localhost:8000/admin/

## Админка

Создать суперпользователя:

```bash
docker compose run --rm backend python manage.py createsuperuser
```

## Переменные окружения

Минимально используемые:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `NEXT_PUBLIC_API_URL`

## Деплой

На сервере:

```bash
docker compose up -d --build
```
