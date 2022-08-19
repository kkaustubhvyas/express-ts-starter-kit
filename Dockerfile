FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV

COPY . /usr/src/app
RUN npm install
RUN npm run build

EXPOSE 8000

CMD [ "npm", "run", "start" ]
