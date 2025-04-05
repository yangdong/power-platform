# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config to use port 9000
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 9000
EXPOSE 9000

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 