FROM node:alpine
WORKDIR /app
COPY /package*.json ./
ENV VITE_BACKEND_URL: ${VITE_BACKEND_URL}
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]