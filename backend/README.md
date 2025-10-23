## Ian Ward — Portfolio (Backend)

Tech: Django 5 + Django REST Framework + CORS Headers.

### Setup

```bash
python3 -m venv backend-venv
source backend-venv/bin/activate
pip install -r requirements.txt
```

If `requirements.txt` is missing, install manually:

```bash
pip install "Django>=5.1,<6.0" djangorestframework django-cors-headers
```

### Run

```bash
cd backend
../backend-venv/bin/python manage.py migrate
../backend-venv/bin/python manage.py runserver 0.0.0.0:8000
```

API endpoints:
- `GET /api/profile/primary/`
- `GET /api/ventures/`
- `GET /api/testimonials/`
- `POST /api/contact/`

Admin: `/admin/` (create a superuser with `createsuperuser`).

