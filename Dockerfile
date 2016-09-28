FROM node:6.4-slim

RUN mkdir -p /opt/app
WORKDIR /opt/app
ADD . /opt/app

PORT 8080

CMD ["npm", "start"]
