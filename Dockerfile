# bcrypt package has problems with node alpine, use regular image
FROM node:10.2.0

# app directory
WORKDIR /usr/src/app

# install deps
COPY package*.json ./

RUN npm install --only=production

COPY . .

# expose internal port
EXPOSE 1337

# start app
CMD [ "npm", "start" ]