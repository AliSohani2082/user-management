#!/bin/bash

# Docker build script

set -e

echo "🐳 Building Docker image for User Management SPA..."

# Build the Docker image
docker build -t user-management-spa:latest .

echo "✅ Docker image built successfully!"

# Optional: Run the container
read -p "Do you want to run the container? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting container..."
    docker run -p 3000:3000 --name user-management-spa-container user-management-spa:latest
fi
