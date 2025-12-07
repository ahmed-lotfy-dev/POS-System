# Build Stage
FROM oven/bun:alpine AS build

WORKDIR /app

COPY package.json bun.lock ./

# Install dependencies
RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile

COPY . .

# Build the app
RUN bun run build

# Production Stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
