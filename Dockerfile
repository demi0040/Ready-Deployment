# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Create permissions for npm
RUN mkdir /.npm && chown -R 1000660000:0 /.npm

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Express app is listening on
EXPOSE 3000

# Start the Express app
CMD ["npm", "start"]
