FROM node:current-buster-slim

WORKDIR /app

COPY package.json /app

RUN npm install

ENTRYPOINT ["npm", "start"]
