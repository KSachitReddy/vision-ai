# AGENTS

This document is the operational contract for AI coding agents working in this
repository.

## Architecture

SignBridge is a pnpm-managed TypeScript monorepo (`apps/`, `packages/`).
The API follows a layered architecture: **routes → controllers → services →
repositories → Prisma**, with Zod validation at the edge.

## Coding Standards

- TypeScript `strict` mode is mandatory.
- No `any` without justification.
- Functional, composable units.
- All public functions documented with TSDoc.
- ESLint + Prettier must pass before commit.

## Folder Structure

```
apps/api/src/
  config/        environment & app configuration
  middleware/    cross-cutting concerns
  routes/        Express route definitions
  controllers/   thin HTTP adapters
  services/      domain logic
  repositories/  data access (Prisma)
  validation/    Zod schemas
  utils/         pure helpers
  ai/            ML/recognition modules
apps/web/src/
  pages/         routed pages
  components/    UI components
  store/         Zustand stores
  lib/           clients & helpers
```

## Security Requirements

- Validate **all** untrusted input with Zod.
- Hash passwords with bcrypt (cost ≥ 12).
- Rotate refresh tokens on every refresh.
- Apply Helmet, CORS, and rate limiting globally.
- Never log secrets.

## Testing Requirements

- Vitest, ≥ 80% coverage.
- Unit tests for services; integration tests for routes.
- API contract tests against the OpenAPI spec.
