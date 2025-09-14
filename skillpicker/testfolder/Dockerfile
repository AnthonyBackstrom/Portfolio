FROM node:19-alpine

WORKDIR /app

COPY package.json /app

COPY test.js /app

RUN npm install

EXPOSE 3002

CMD ["node", "test.js"]
