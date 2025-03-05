#!/bin/bash

python manage.py collectstatic --no-input
python manage.py migrate --noinput

waitress-serve --port=$PORT redlight_finance_37205.wsgi:application
#gunicorn -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT redlight_finance_37205.wsgi:application