# SignBridge

[![License: AGPL-3.0-only](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20+-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9-orange.svg)](https://pnpm.io/)

> AI-powered accessibility platform bridging deaf, hard-of-hearing, and hearing
> individuals through real-time sign language and gesture recognition.

## Overview

SignBridge enables real-time, bidirectional communication between sign language
users and hearing individuals using webcam-based hand-landmark detection, gesture
classification, and natural-language translation services.

## Architecture

SignBridge is a **TypeScript monorepo** managed by `pnpm` workspaces.

```
signbridge/
├── apps/
│   ├── api/        Express + TypeScript + Prisma backend
│   └── web/        React + Vite + Tailwind frontend
├── packages/
│   ├── shared/     Shared domain types & DTOs
│   ├── ui/         Shared UI primitives
│   └── config/     Shared configuration
├── docs/           Architecture & operations documentation
├── .specify/       Spec-Kit constitution & templates
└── specs/          Feature specifications
```

### Stack

- **Frontend** — React, TypeScript, Vite, TailwindCSS, React Router, TanStack
  Query, Zustand, Axios.
- **Backend** — Node.js, Express, TypeScript, Prisma, PostgreSQL, Zod, Pino,
  Helmet, JWT with refresh-token rotation, RBAC.
- **AI** — MediaPipe Hands, OpenCV, TensorFlow.js (browser inference).
- **Tooling** — pnpm, ESLint, Prettier, Vitest, Knip, Husky, Gitleaks,
  git-cliff, Docker.

## Features

- Authentication: register, login, logout, refresh, password reset,
  email-verification architecture, RBAC.
- User profiles & accessibility preferences.
- Sign recognition pipeline (webcam → MediaPipe → classifier → confidence).
- Translation: sign↔text, speech→sign, sign→speech.
- Translation, activity, and search history.
- Dashboard with user statistics and metrics.
- Admin panel: user/role management, audit logs, system health.
- REST API with full OpenAPI/Swagger documentation.

## Installation

```bash
# Prerequisites: Node 20+, pnpm 9+, Docker (optional)
git clone https://github.com/kommerasachit/signbridge.git
cd signbridge
cp .env.example .env
pnpm install
```

### Database

```bash
docker compose up -d postgres
pnpm --filter @signbridge/api prisma:migrate
pnpm --filter @signbridge/api prisma:seed
```

## Configuration

All configuration is loaded from environment variables — see
[`.env.example`](.env.example). Never commit real secrets.

## Usage

```bash
pnpm dev                       # run web + api in parallel
pnpm --filter @signbridge/api dev
pnpm --filter @signbridge/web dev
```

The API is served at `http://localhost:8080/api`, Swagger UI at
`http://localhost:8080/docs`, and the web app at `http://localhost:5173`.

## Testing

```bash
pnpm test
pnpm test:coverage
```

Coverage thresholds: **80% lines / functions / statements, 75% branches**.

## Deployment

```bash
docker compose up --build
```

The provided `Dockerfile` produces a production API image; the web app builds to
static assets in `apps/web/dist` and can be served via any CDN.

## Security

See [SECURITY.md](SECURITY.md). The project enforces:

- Helmet, CORS, rate limiting.
- JWT access + rotating refresh tokens.
- Zod input validation on every route.
- Gitleaks secret-scanning and `pnpm audit` in CI.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All commits must follow
[Conventional Commits](https://www.conventionalcommits.org/).

## License

SignBridge is licensed under [AGPL-3.0-only](LICENSE) © Kommera Sachit Reddy.
