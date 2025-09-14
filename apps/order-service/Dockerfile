# Multi-stage build for Order Service
FROM node:18-alpine AS dependencies

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Base stage for development
FROM dependencies AS base

# Copy all source code for development
COPY . .

# Build stage
FROM dependencies AS builder

# Copy all source code
COPY . .

# Disable Nx daemon and build
RUN NX_DAEMON=false npx nx build order-service --prod

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist/apps/order-service/ ./

# Install production dependencies if package.json exists
RUN if [ -f package.json ]; then npm install --only=production --silent; fi

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port (microservice doesn't need exposed port, but useful for debugging)
EXPOSE 3002

# Start the application
CMD ["node", "main.js"]