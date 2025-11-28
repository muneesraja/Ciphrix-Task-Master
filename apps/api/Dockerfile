FROM oven/bun:1

WORKDIR /app

COPY package.json ./
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN bun install

# Copy source code
COPY apps/api ./apps/api

WORKDIR /app/apps/api

EXPOSE 5001

CMD ["bun", "run", "src/index.js"]
