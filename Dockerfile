FROM node:24 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
RUN cp /app/cfg/settings.js.example /app/cfg/settings.js

FROM nginx:alpine-slim as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/cfg /app
COPY nginx.conf /etc/nginx/nginx.conf