#!/bin/bash
# Build script for Vercel

# Install Ruby dependencies if needed
if ! command -v jekyll &> /dev/null; then
  gem install jekyll sass bundler jekyll-minifier jekyll-sitemap
fi

# Install Node dependencies
npm install

# Build the site
npm run build

# Jekyll will build to _site directory
echo "Build complete!"

