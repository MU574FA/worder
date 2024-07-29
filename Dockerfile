FROM python:3.9-slim

WORKDIR /worder-app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8080

CMD [ "waitress-serve", "main:app" ]