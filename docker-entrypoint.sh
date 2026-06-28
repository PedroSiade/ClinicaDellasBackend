#!/bin/sh
set -e

wait_for_db() {
  echo "Waiting for database..."
  retries=30
  while [ "$retries" -gt 0 ]; do
    if node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$queryRaw\`SELECT 1\`.then(() => prisma.\$disconnect()).then(() => process.exit(0)).catch(() => process.exit(1));" >/dev/null 2>&1; then
      echo "Database is reachable."
      return 0
    fi
    retries=$((retries - 1))
    echo "Database not ready, retrying in 2s... ($retries attempts left)"
    sleep 2
  done
  echo "Could not connect to database after multiple attempts."
  exit 1
}

wait_for_db

echo "Applying migrations..."
npm run prisma:deploy

if [ "${RUN_SEED:-true}" = "true" ]; then
  echo "Seeding database..."
  npm run seed
else
  echo "Skipping seed (RUN_SEED=$RUN_SEED)."
fi

exec "$@"
