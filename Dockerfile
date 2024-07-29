FROM python:3.9-slim

WORKDIR /worder-app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD [ "waitress-serve", "--host=0.0.0.0", "--port=8000", "main:app" ]