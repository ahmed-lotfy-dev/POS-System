# Base image
FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma/

# Install dependencies
RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile

COPY . .

# Generate Prisma Client
RUN bun run prisma generate

# Build the app
RUN bun run build

# Production image
FROM oven/bun:alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 8000

CMD [ "bun", "run", "start:prod" ]
