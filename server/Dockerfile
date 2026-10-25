# Base image
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (untouched since the final product ~70min install layer stays cached)
# cache-mount keeps the npm tarball cache on disk across cold rebuilds so a lost layer
# still re-installs from cache instead of re-downloading; npm ci is deterministic (lockfile).
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the app
RUN npm run build

# Drop devDependencies — keeps the prod image ~50% smaller and the final copy fast
RUN npm prune --omit=dev --no-audit --no-fund

# Production image
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 8000

CMD [ "npm", "run", "start:prod" ]
