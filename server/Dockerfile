FROM ubuntu:latest

RUN apt-get upgrade && apt-get update
RUN apt-get install -y python3 python3-pip
RUN apt-get install -y nginx

ADD ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip3 install -r requirements.txt

# RUN rm /etc/nginx/site-enabled/default
# ADD /etc/nginx/sites-enabled/flask ./nginx/sites-enabled/flask

CMD python3 server.py
# CMD gunuicorn -w 3 server:app && sudo systemctl restart nginx