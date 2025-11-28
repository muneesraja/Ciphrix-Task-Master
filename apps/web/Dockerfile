FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json ./
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN bun install

# Copy source code
COPY apps/web ./apps/web

WORKDIR /app/apps/web

# Build the app
RUN bun run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
