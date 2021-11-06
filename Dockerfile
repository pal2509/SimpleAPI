FROM node:16
EXPOSE 8080

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . /home/app

#CMD [ "npm", "start" ]