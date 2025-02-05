# Use Node.js Alpine as the base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json (no package-lock.json)
COPY package.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Use a minimal image for running the app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app .

# Expose the port used by Next.js
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
