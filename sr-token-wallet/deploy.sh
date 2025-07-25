#!/bin/bash

# SR Token Wallet Deployment Script
# This script handles the build and deployment process

set -e

echo "🚀 Starting SR Token Wallet deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run type check
echo "🔍 Running TypeScript type check..."
npx tsc --noEmit

# Build the application
echo "🔨 Building application..."
npm run build

# Verify build output
if [ ! -d "dist/sr-token-wallet/browser" ]; then
    echo "❌ Error: Build output not found at dist/sr-token-wallet/browser"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output: dist/sr-token-wallet/browser"
echo "🌐 Ready for deployment to Netlify/Vercel" 