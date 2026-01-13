# Use Node 20 LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Upgrade npm to latest stable to avoid weird install issues
RUN npm install -g npm@11

# Install dependencies
RUN npm install --force

# Copy source code
COPY . .

# Build project
RUN npm run build

# Expose backend port (default for NestJS)
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start:dev"]
