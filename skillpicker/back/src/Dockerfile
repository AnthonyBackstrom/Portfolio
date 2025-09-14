FROM node:19-alpine

WORKDIR /app

#COPY package.json /app

#COPY tesmi.js /app

#COPY ./endpoints /app/

COPY . /app
RUN npm install

RUN npm install pg-promise

EXPOSE 3001

CMD ["node", "tesmi.js"]
