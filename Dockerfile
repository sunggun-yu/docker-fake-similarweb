FROM node:latest

LABEL maintainer="Sunggun Yu <sunggun.dev@gmail.com>"

WORKDIR /json-server

RUN npm install --save moment json-server

EXPOSE 9081

ADD json-server /json-server

CMD node server.js
