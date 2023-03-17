FROM node:current-buster-slim

WORKDIR /app

COPY package.json /app

RUN npm install

COPY broker.js /app

ENTRYPOINT ["npm", "start"]
