FROM node:alpine3.18
WORKDIR /app

# Create a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy package.json and package-lock.json separately to optimize layer caching
COPY package.json package-lock.json ./
RUN npm install --production  # Install only production dependencies

# Copy the rest of the app
COPY . .

EXPOSE 5000
CMD [ "npm", "run", "start" ]
