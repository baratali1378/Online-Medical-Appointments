# Step 1: Build the application
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Next.js project
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the built application using a lightweight web server
FROM node:18 AS runner

# Set the working directory for the runtime container
WORKDIR /app

# Copy only the build output from the builder step
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port your app runs on
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "start"]
