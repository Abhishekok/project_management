# Use Node 22 as the base image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy sub-project package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN cd backend && npm install
RUN cd frontend && npm install

# Copy the rest of the code
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Expose port (if needed, backend usually on 5000 or similar)
EXPOSE 5000

# Start command
CMD ["npm", "start"]
