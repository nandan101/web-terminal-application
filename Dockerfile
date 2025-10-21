bash
# Stage 1: Build the Node.js server
FROM node:22.1.0-slim as base

# Install required packages for node-gyp
RUN apt-get update && \
    apt-get install -y python3 make g++ curl gnupg2 ca-certificates nginx && \
    useradd -m node && \
    chown -R node:node /app && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy app files
COPY --from=0 . .

# Install dependencies
RUN npm install

# Configure Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log
 && ln -sf /dev/stderr /var/log/nginx/error.log

# Expose the default HTTP port
EXPOSE 80

# Start both Nginx and Node.js
CMD sh -c "node server.js & nginx -g 'daemon off;'"