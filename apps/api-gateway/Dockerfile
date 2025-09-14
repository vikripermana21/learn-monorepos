# Multi-stage build for API Gateway
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
RUN NX_DAEMON=false npx nx build api-gateway --prod

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install curl for health check
RUN apk add --no-cache curl

# Copy built application
COPY --from=builder /app/dist/apps/api-gateway/ ./

# Install production dependencies if package.json exists
RUN if [ -f package.json ]; then npm install --only=production --silent; fi

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "main.js"]
