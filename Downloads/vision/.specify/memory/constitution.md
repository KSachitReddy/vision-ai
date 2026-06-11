# SignBridge Engineering Constitution

This constitution is the supreme engineering contract for SignBridge. Every
contributor and AI agent must comply.

## 1. Code Quality

- TypeScript strict mode is mandatory.
- ESLint and Prettier must pass before merging.
- No `any` without explicit, justified annotation.
- Small, composable functions; ≤ 50 lines per component when practical.
- DRY: shared logic lives in `packages/shared`.

## 2. Security

- All untrusted input is validated with Zod.
- Passwords are hashed with bcrypt cost ≥ 12.
- JWTs are short-lived; refresh tokens rotate on every refresh.
- Helmet, CORS, and global rate limiting are always enabled.
- Secrets live in `.env` only — never in source control.
- CI fails on Gitleaks findings and on high/critical `pnpm audit` findings.

## 3. Testing

- Vitest is the canonical runner.
- Minimum coverage: 80% lines / functions / statements, 75% branches.
- Every service requires unit tests; every route requires integration tests.

## 4. Documentation

- README, CONTRIBUTING, USER_MANUAL, AGENTS, CHANGELOG, SECURITY, CODE_OF_CONDUCT
  are kept up to date.
- All public functions documented with TSDoc.
- OpenAPI spec is the single source of truth for the HTTP API.

## 5. Architecture

- Monorepo with `apps/` and `packages/`.
- API layered as routes → controllers → services → repositories → Prisma.
- Web layered as pages → components → store → lib.
- AI modules isolated in `apps/api/src/ai` and `apps/web/src/lib/mediapipe.ts`.

## 6. CI/CD

- GitLab CI runs validate → lint → typecheck → test → security → build → release.
- All stages must pass before merge.

## 7. Dependency Management

- pnpm only.
- Renovate-ready: dependency versions are pinned via `pnpm-lock.yaml`.
- `pnpm audit` runs in every CI pipeline.
