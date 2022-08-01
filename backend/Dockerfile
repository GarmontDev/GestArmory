FROM node:14-alpine as base

RUN mkdir -p ./

WORKDIR /src/app

COPY package.json ./

RUN npm cache verify && npm install

#RUN npm install
COPY . ./

EXPOSE 3700

CMD ["npm","start"]