#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci --production=false

# Clear any previous builds
echo "Clearing previous builds..."
rm -rf dist/

# Build the application
echo "Building application..."
npm run build

echo "Build completed successfully!" 