# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN pnpm run build

# Expose the port on which the app will run
EXPOSE 3001

# Start the server using the production build
CMD ["pnpm", "run", "start:prod"]