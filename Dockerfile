# Use the official Node.js image based on Alpine Linux for a small, efficient image
FROM node:alpine3.18

# Set the working directory inside the container to /app
WORKDIR /app

# Copy only the package.json file first to take advantage of Docker's caching mechanism.
# This way, npm install will only run again if package.json changes.
COPY package.json ./

# Install the dependencies defined in package.json
# (By default, this installs both production and development dependencies)
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose port 5000 so the app is accessible when running in the container
EXPOSE 5000

# The command to start the app once the container is running
CMD [ "npm", "run", "start" ]
