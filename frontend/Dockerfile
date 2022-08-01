FROM node:14-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app

RUN npm cache verify

RUN npm install

COPY . /src/app

EXPOSE 4200

CMD ["npm","start"]

