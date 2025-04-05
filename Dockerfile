# Use node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Expose port 3000 (default port for npm start)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]