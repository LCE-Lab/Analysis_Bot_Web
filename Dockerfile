FROM node:24-alpine AS build-stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
WORKDIR /app

COPY . /app
RUN pnpm install --frozen-lockfile
RUN pnpm run build

RUN cp /app/cfg/settings.js.example /app/cfg/settings.js

FROM nginx:alpine-slim AS production-stage
RUN apk -U upgrade
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/cfg /app
COPY nginx.conf /etc/nginx/nginx.conf
