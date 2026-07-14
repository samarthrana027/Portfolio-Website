#!/bin/bash
set -e

if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN is not set."
  echo "Please define GITHUB_TOKEN in your environment or Settings menu to push programmatically."
  exit 1
fi

echo "Pushing to GitHub repository..."
git push -f "https://$GITHUB_TOKEN@github.com/samarthrana027/Portfolio-Website.git" main
echo "Successfully pushed to GitHub!"
