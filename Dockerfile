# Stage 1: Build the client app
FROM node:alpine as client-builder

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

COPY client .

RUN npm run build

# Stage 2: Build the server app
FROM node:alpine as server-builder

WORKDIR /app/server

COPY server/package*.json ./

RUN npm install

COPY server .

# Stage 3: Final image with both client and server apps
FROM node:alpine

WORKDIR /app

# Copy the built client app
COPY --from=client-builder /app/client/dist ./client/dist

# Copy the server app
COPY --from=server-builder /app/server .

# Install PM2 globally
RUN npm install -g pm2

# Expose ports 3000 and 3001
EXPOSE 3000
EXPOSE 3001

# Start the app using PM2
CMD ["pm2-runtime", "start", "server.js"]