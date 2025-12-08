# Base image
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the app
RUN npm run build

# Production image
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 8000

CMD [ "npm", "run", "start:prod" ]
