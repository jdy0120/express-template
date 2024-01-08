FROM node:16.19.1-alpine3.16 as base

LABEL versions="1.0.0"
LABEL maintainer="doyeonism"

FROM base as local
WORKDIR /usr/src/app
ENV NODE_ENV=development
COPY ["package.json", "package-lock.json", "./"]
RUN apk --no-cache --virtual build-dependencies \
    add python3 make g++ \
    && npm ci \
    && apk del build-dependencies
COPY . .
CMD ["npm", "run", "start:dev"]