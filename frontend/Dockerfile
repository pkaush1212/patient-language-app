FROM node:14-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

ENV PORT $PORT

RUN npm config set unsafe-perm true

COPY package.json tsconfig.json .env.development .env.production /app/
RUN npm install\
        && npm install serve -g && npm install -g react-scripts

COPY src /app/src/
COPY public /app/public/
RUN npm run build

CMD serve -p $PORT -s build