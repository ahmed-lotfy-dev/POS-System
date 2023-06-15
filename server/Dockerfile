FROM node:alpine

# Set the working directory
WORKDIR /app/server

# Copy the app package and package-lock.json file
COPY /server/package*.json ./

# Install node packages
RUN npm install

# Copy the project directory (locally) to the current directory of the Docker image
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]