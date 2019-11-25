FROM ubuntu:latest

RUN apt-get upgrade && apt-get update
RUN apt-get install -y python3 python3-pip

ADD ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip3 install -r requirements.txt

# CMD python3 server.py
CMD gunicorn -w 3 server:app --bind '0.0.0.0:5000'
