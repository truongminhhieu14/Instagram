FROM node:20.10.0-alpine as base

WORKDIR /app
COPY package.json yarn.lock ./

FROM base as dev
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "start:dev"]

FROM base as prod
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn add global @nestjs/cli
RUN yarn build
CMD ["yarn", "start:prod"]