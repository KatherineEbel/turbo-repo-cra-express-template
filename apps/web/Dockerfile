FROM node:alpine AS base
RUN apk update
RUN npm install -g turbo

FROM base as pruner
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --filter=web

# Add lockfile and package.json's of isolated subworkspace
FROM pruner AS installer
WORKDIR /app
COPY --from=builder nginx/default.conf .
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Copy source code of pruned subworkspace and build

FROM installer as builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=web


FROM nginx
EXPOSE 3000
WORKDIR /app
COPY --from=installer nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out/full /usr/share/nginx/html