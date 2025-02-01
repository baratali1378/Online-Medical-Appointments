# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Strapi application (optional, but recommended for production)
RUN npm run build

# Expose the port your Strapi app runs on
EXPOSE 1337

# Start Strapi in production mode
CMD ["npm", "start"]
