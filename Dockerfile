FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG SCOPE
ARG NODE_ENV

COPY . /usr/src/app
RUN npm install
RUN npm run compile

EXPOSE 8000

CMD [ "npm", "run", "deploy" ]
