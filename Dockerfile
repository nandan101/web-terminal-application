bash
# Stage 1: Build the Node.js server
bash
# Install required packages for node-gyp
RUN apt-get update && \
    apt-get install -y python3 make g++ curl gnupg2 ca-certificates nginx && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy app files, excluding sensitive data
COPY --from=0 /path/to/sensitive/data/ . .

# Install dependencies
RUN npm install

# Configure Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log
COPY nginx.conf /etc/nginx/nginx.conf

# Forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

# Expose the default HTTP port
EXPOSE 80

# Start both Nginx and Node.js
CMD sh -c "node server.js & nginx -g 'daemon off;'"