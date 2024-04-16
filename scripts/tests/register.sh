#!/bin/bash
source ../../.env

# API endpoint URL
API_URL="$API_BASE_URL"

# User registration details
USERNAME="testuser"
PASSWORD="testpassword"

# Send a POST request to register a new user
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" "$API_URL/register"

echo ""