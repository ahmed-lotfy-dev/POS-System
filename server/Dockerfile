FROM node:alpine

# Set the working directory
WORKDIR /app/server

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install

# Copy the project directory (locally) to the current directory of the Docker image
COPY . .

# Expose port 3001
EXPOSE 3001

# Start the app
CMD ["npm", "run", "start"]