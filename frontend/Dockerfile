# Stage 1: build
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .




EXPOSE 5173:5173
CMD ["npm", "run", "dev","--", "--host"]