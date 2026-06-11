#!/usr/bin/env bash
# bootstrap.sh - one-command developer bootstrap for SignBridge
set -euo pipefail

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Installing pnpm via corepack..."
  corepack enable
  corepack prepare pnpm@9.0.0 --activate
fi

pnpm install
cp -n .env.example .env || true

if command -v docker >/dev/null 2>&1; then
  docker compose up -d postgres
  pnpm --filter @signbridge/api prisma:generate
  pnpm --filter @signbridge/api prisma:migrate
  pnpm --filter @signbridge/api prisma:seed
fi

echo "SignBridge bootstrap complete."
