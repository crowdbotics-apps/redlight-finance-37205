FROM crowdbotics/cb-django:3.8-slim-buster AS build

# Copy dependency management files and install app packages to /.venv
COPY backend/Pipfile backend/Pipfile.lock /
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy


FROM crowdbotics/cb-django:3.8-slim-buster AS release
ARG SECRET_KEY

# Set Working directory
WORKDIR /opt/webapp
COPY backend/Pipfile* /opt/webapp/

# Add runtime user with respective access permissions
RUN groupadd -r django \
  && useradd -d /opt/webapp -r -g django django \
  && chown django:django -R /opt/webapp
USER django

# Copy virtual env from build stage
COPY --chown=django:django --from=build /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

# Copy app source
COPY --chown=django:django ./backend .

# Collect static files and serve app
RUN python3 manage.py collectstatic --no-input
CMD gunicorn -k uvicorn.workers.UvicornWorker --workers=2 redlight_finance_37205.wsgi:application --bind 0.0.0.0:$PORT --reload