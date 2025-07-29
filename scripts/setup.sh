#!/bin/bash

# Setup script for development environment

echo "🚀 Setting up User Management SPA development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Setup Husky
echo "🐕 Setting up Husky..."
npm run prepare

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your environment variables"
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test:ci

echo "✅ Setup complete! You can now run:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run test    - Run tests"
echo "  npm run lint    - Run linter"
echo "  npm run format  - Format code"
