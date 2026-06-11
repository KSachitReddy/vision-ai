# Plan: core

## Architecture
Implemented as part of the SignBridge layered monorepo (routes → services → repositories).

## Tasks
See [tasks.md](tasks.md).

## Security
- Zod input validation.
- JWT-protected endpoints where applicable.
- Rate limiting via express-rate-limit.

## Testing
- Unit tests in `tests/`.
- Integration tests against the API.
