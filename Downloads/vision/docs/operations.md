# Operations Runbook

## Database migrations

```bash
pnpm --filter @signbridge/api prisma:migrate
pnpm --filter @signbridge/api prisma:seed
```

## Logs

The API uses structured JSON logging via Pino. Stream logs with:

```bash
docker compose logs -f api
```

## Backups

PostgreSQL data lives in the `signbridge_pg` named volume. Snapshot it
periodically with `docker run --rm -v signbridge_pg:/data alpine tar czf - /data`.

## Incident response

1. Roll back via `git revert` and redeploy.
2. Rotate JWT secrets if compromise is suspected.
3. Revoke all refresh tokens with `prisma.refreshToken.updateMany`.
