# Docker Deployment Guide

This guide explains how to deploy the learn-monorepos microservices using Docker and Docker Compose.

## Architecture Overview

The monorepo contains three NestJS microservices:
- **API Gateway** (Port 3000) - Main entry point for external requests
- **User Service** - Handles user-related operations via Redis transport
- **Order Service** - Handles order-related operations via Redis transport
- **Redis** (Port 6379) - Message broker for microservices communication

## Prerequisites

- Docker and Docker Compose installed
- At least 4GB of available RAM
- Ports 3000 and 6379 available on your host machine

## Quick Start

### Production Deployment

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Start in detached mode:**
   ```bash
   docker-compose up -d --build
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

### Development Deployment

For development with hot reload:

1. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Start specific service in development:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build api-gateway
   ```

## Available Endpoints

Once deployed, the API Gateway will be available at:
- **Base URL:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/api/health (if implemented)

## Docker Commands Reference

### Building Services

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build api-gateway
docker-compose build user-service  
docker-compose build order-service

# Build without cache
docker-compose build --no-cache
```

### Managing Services

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Restart specific service
docker-compose restart api-gateway
```

### Monitoring and Debugging

```bash
# View logs for all services
docker-compose logs

# Follow logs for specific service
docker-compose logs -f user-service

# Execute commands in running container
docker-compose exec api-gateway sh

# View running containers
docker-compose ps

# View container resource usage
docker stats
```

### Development Commands

```bash
# Development mode with hot reload
docker-compose -f docker-compose.dev.yml up

# Rebuild development containers
docker-compose -f docker-compose.dev.yml up --build

# Development logs
docker-compose -f docker-compose.dev.yml logs -f api-gateway
```

## Environment Variables

The services use these environment variables:

### Common Variables
- `NODE_ENV` - Set to 'production' or 'development'
- `REDIS_HOST` - Redis server hostname (default: 'redis')
- `REDIS_PORT` - Redis server port (default: 6379)

### API Gateway Specific
- `PORT` - Server port (default: 3000)
- `USER_SERVICE_HOST` - User service hostname
- `ORDER_SERVICE_HOST` - Order service hostname

## Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :6379
   ```

2. **Permission issues:**
   ```bash
   # Fix Docker permissions (macOS/Linux)
   sudo chown -R $USER:$USER .
   ```

3. **Build failures:**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Remove all containers and rebuild
   docker-compose down -v
   docker-compose build --no-cache
   ```

4. **Out of disk space:**
   ```bash
   # Clean unused Docker resources
   docker system prune -a --volumes
   ```

### Health Monitoring

Monitor Redis connection:
```bash
# Connect to Redis container
docker-compose exec redis redis-cli ping
```

Check service health:
```bash
# View container status
docker-compose ps

# Check specific service logs
docker-compose logs user-service
```

## Production Considerations

1. **Environment Variables:** Use `.env` files for production secrets
2. **Scaling:** Use `docker-compose up --scale user-service=3` for horizontal scaling
3. **Monitoring:** Consider adding health checks and monitoring tools
4. **Reverse Proxy:** Use Nginx or Traefik in front of the API Gateway
5. **SSL/TLS:** Implement HTTPS termination at the load balancer level
6. **Backup:** Regular Redis data backups for persistence

## Next Steps

- Add environment-specific configuration files
- Implement health check endpoints
- Set up CI/CD pipeline with Docker builds
- Consider Kubernetes deployment for production scale
- Add monitoring and logging solutions (ELK stack, Prometheus)

## File Structure

```
.
├── apps/
│   ├── api-gateway/Dockerfile
│   ├── user-service/Dockerfile
│   └── order-service/Dockerfile
├── docker-compose.yml           # Production setup
├── docker-compose.dev.yml       # Development setup
├── .dockerignore               # Docker build optimization
└── DOCKER_DEPLOYMENT.md        # This guide
```
