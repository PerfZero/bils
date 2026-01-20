# MMS Shop

Dockerized Django (API) + Next.js (frontend) online store starter.

## Quick start

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/products/
- Admin: http://localhost:8000/admin/

## Create admin user

```bash
docker compose run --rm backend python manage.py createsuperuser
```

Then add categories/products in the Django admin.
