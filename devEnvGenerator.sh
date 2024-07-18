#!/bin/bash

# ANSI color codes
RED='\033[1;31m'
BLUE='\033[1;34m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Create .env file
cat <<EOL > .env
# Environment variables for the development environment
# This file should be included in the .gitignore file

JTW_SECRET_KEY=T00&S3cr3tK3y!
JTW_EXPIRES_IN=15d

POSTGRES_HOST=172.16.0.14
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=booking_system_db
POSTGRES_CONNECTION_URL=postgres://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@\${POSTGRES_HOST}:\${POSTGRES_PORT}/\${POSTGRES_DB}

MONGO_PORT=27017
MONGO_DB_HOST=booking_system_mongodb
MONGO_DB_NAME=booking_system
MONGO_CONNECTION_URL=mongodb://\${MONGO_DB_HOST}:\${MONGO_PORT}/\${MONGO_DB_NAME}
# MONGO_CONNECTION_URL=mongodb://booking_system_mongodb:27017/booking_system

APP_PORT=5000
EOL

# Initialize counters
new_entries=0
existing_entries=0

# Check if .gitignore file already exists
if [ ! -f .gitignore ]; then
  touch .gitignore
  echo -e "${GREEN}${BOLD}.gitignore file created.${NC}"
fi

# Function to check and add entry to .gitignore
check_and_add() {
  local entry="$1"
  if grep -qxF "$entry" .gitignore; then
    if [ "$entry" == "devEnvGenerator.sh" ] || [ "$entry" == ".env" ]; then
      echo -e "⚠️ ${YELLOW}${BOLD}$entry is already in the .gitignore file.${NC}"
    else
      echo -e "${BLUE}${BOLD}$entry is already in the .gitignore file.${NC}"
    fi
    ((existing_entries++))
  else
    echo "$entry" >> .gitignore
    echo -e "👍 ${BLUE}${BOLD}$entry added to the .gitignore file.${NC}"
    ((new_entries++))
  fi
}

# Check and add entries
check_and_add "devEnvGenerator.sh"
check_and_add ".env"

# Summary messages
if (( new_entries > 0 )); then
  echo -e "✏️ ${BLUE}${BOLD}$new_entries entries added to the .gitignore file.${NC}"
fi
if (( existing_entries > 0 )); then
  echo -e "‼️ ${RED}${BOLD}$existing_entries entries were already present in the .gitignore file.${NC}"
fi

echo -e "✅ ${GREEN}${BOLD}Environment variables file .env created successfully and checked/updated .gitignore.${NC}"
