FROM node:20-alpine

WORKDIR /app

COPY package*.json .

COPY jsconfig.json .

RUN npm i --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]