FROM node:8.14.0-alpine

COPY package.json .
RUN npm install

COPY src src
ENTRYPOINT npm run start
