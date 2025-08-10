FROM node:22 as build-stage
WORKDIR /app

ENV NODE_ENV=production
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable

COPY . .
RUN yarn install --immutable

RUN yarn build
RUN cp /app/cfg/settings.js.example /app/cfg/settings.js

FROM nginx:alpine-slim as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/cfg /app
COPY nginx.conf /etc/nginx/nginx.conf
