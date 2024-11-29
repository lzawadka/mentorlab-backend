#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
until nc -z -v -w30 postgres-db 5432; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - running migrations..."
npx prisma migrate deploy
