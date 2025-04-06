# Production image using nginx
FROM nginx:alpine

# Copy already built files from local build directory to nginx serve directory
COPY build/ /usr/share/nginx/html/

# Copy custom nginx config to use port 9000
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 9000
EXPOSE 9000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]