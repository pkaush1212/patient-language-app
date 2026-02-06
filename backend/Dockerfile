FROM node:14-alpine

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
ENV PORT $PORT

WORKDIR /app

RUN npm config set unsafe-perm true
RUN npm install --global typescript@latest

COPY package.json tsconfig.json tslint.json .env .env.dev .env.prod /app/
RUN apk --no-cache --virtual build-dependencies add \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

RUN npm install tsc -g --force

COPY src /app/src/
RUN npm run build

CMD node dist/index.js
