#!/bin/sh
set -e

echo "Applying migrations..."
npm run prisma:deploy

echo "Seeding database..."
npm run seed

exec "$@"
