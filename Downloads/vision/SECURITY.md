# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | ✅        |
| < 0.1   | ❌        |

## Reporting a Vulnerability

Please report security vulnerabilities **privately** by emailing
`security@signbridge.dev`. Do **not** open a public issue.

We aim to:

- Acknowledge reports within **72 hours**.
- Provide a remediation timeline within **7 days**.
- Publicly disclose after a fix is released and users have had time to upgrade.

## Security Practices

- All untrusted input is validated with [Zod](https://zod.dev/).
- Passwords are hashed with **bcrypt** (cost ≥ 12).
- JWT access tokens are short-lived; refresh tokens rotate on every use.
- HTTP responses are hardened with **Helmet**.
- **CORS** is restricted to configured origins.
- Global **rate limiting** is enforced.
- **Gitleaks** scans every commit and CI run.
- `pnpm audit --audit-level=high` runs in CI and blocks on high/critical CVEs.
- Secrets are loaded only from environment variables, never committed.
