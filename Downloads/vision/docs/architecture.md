# Architecture Overview

SignBridge is a TypeScript monorepo orchestrated with `pnpm` workspaces.

```
┌──────────────────────────┐         ┌──────────────────────────┐
│ apps/web (React + Vite)  │ HTTPS   │ apps/api (Express + TS)  │
│  • Pages / Components    │ <──────►│  • Routes                │
│  • Zustand store         │  JSON   │  • Controllers           │
│  • TanStack Query        │         │  • Services              │
│  • MediaPipe / TFJS      │         │  • Repositories          │
└──────────────────────────┘         │  • Prisma → PostgreSQL   │
                                     └──────────────────────────┘
```

## Layers

- **Routes** map HTTP verbs to controllers and apply middleware
  (auth, validation, rate limiting).
- **Controllers** are thin HTTP adapters; they never contain business rules.
- **Services** own business logic and orchestrate repositories.
- **Repositories** are the only layer that talks to Prisma.
- **AI** modules (`apps/api/src/ai`) are pure functions; future TFJS models slot
  in without changes elsewhere.

## Data Flow — Sign Recognition

1. Browser captures webcam frames via `getUserMedia`.
2. MediaPipe Hands extracts 21 landmarks per hand.
3. Landmarks are normalised in-browser and POSTed to `/api/recognition/frame`.
4. The API normalises again, classifies, and returns `{ label, confidence }`.
5. The translation service persists translation history per user.

## Security Architecture

- Helmet sets secure HTTP headers.
- CORS restricts allowed origins.
- `express-rate-limit` enforces request quotas.
- JWT access tokens (15 min) with rotating refresh tokens (7 days).
- Zod validates every request body and query.
