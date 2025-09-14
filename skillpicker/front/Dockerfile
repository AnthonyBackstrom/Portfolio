# FROM node:16-alpine

# WORKDIR /usr/src/app

# COPY package*.json ./usr/src/app

# Install dependencies
# RUN npm install

# Copy the source code to the container, remember gitingore! 

# COPY . /usr/serc/app

# Expose port 3000 for the app 
# EXPOSE 3000

# CMD ["npm", "start"]

############# -------

FROM node:19-alpine

WORKDIR /usr/app

# Copy packages to /usr/app/. the / at the end is important so it creates a folder

COPY package.json /usr/app/

ARG REACT_APP_JWT_SECRET
ENV REACT_APP_JWT_SECRET=${REACT_APP_JWT_SECRET}

#ARG REACT_APP_JWT_SECRET

#ENV REACT_APP_JWT_SECRET=$REACT_APP_JWT_SECRET

# Install dependencies from package.json

COPY . /usr/app

RUN npm install 
#Expose port 3000 for the app

RUN npm run build

CMD [ "npx", "serve", "build" ]

# CMD ["serve", "-s", "build"]
# CMD ["npm", "start"]
