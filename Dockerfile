FROM node:latest AS development

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 8000

CMD npm run start:dev