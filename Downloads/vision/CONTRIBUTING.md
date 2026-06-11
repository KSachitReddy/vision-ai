# Contributing to SignBridge

Thanks for helping make communication more accessible. This document explains
how to contribute effectively.

## Branch Strategy

- `main` — protected, production-ready.
- `develop` — integration branch.
- `feat/<name>` — feature branches.
- `fix/<name>` — bug-fix branches.
- `chore/<name>` — maintenance.

## Conventional Commits

All commits **must** follow the
[Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`chore`, `ci`, `security`.

## Pull Requests

1. Fork & create a branch from `develop`.
2. Add tests for any new behaviour.
3. Run `pnpm lint && pnpm typecheck && pnpm test:coverage` locally.
4. Open a PR with a clear description and link any related issue.
5. At least one approving review is required.

## Testing Requirements

- Unit + integration tests for new code.
- Coverage must stay ≥ 80%.
- New endpoints require API tests in `tests/`.

## Review Workflow

- Reviewers verify functionality, security, and accessibility.
- CI must be green before merge.
- Squash-merge only.
