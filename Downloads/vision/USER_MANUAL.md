# SignBridge User Manual

## Setup

1. Install Node.js 20+ and pnpm 9+.
2. Clone the repository: `git clone https://github.com/kommerasachit/signbridge.git`.
3. Copy `.env.example` to `.env` and adjust values.
4. Run `pnpm install`.

## Configuration

| Variable             | Description                          |
|----------------------|--------------------------------------|
| `DATABASE_URL`       | PostgreSQL connection string         |
| `API_PORT`           | Backend port (default 8080)          |
| `JWT_ACCESS_SECRET`  | Access token signing secret          |
| `JWT_REFRESH_SECRET` | Refresh token signing secret         |
| `CORS_ORIGIN`        | Comma-separated allowed origins      |
| `VITE_API_BASE_URL`  | Web client API base URL              |

## Usage

### Start everything

```bash
docker compose up -d postgres
pnpm dev
```

Visit `http://localhost:5173` and create an account.

### Sign Recognition

1. Allow webcam access.
2. Place your hand in the camera frame.
3. Watch the live confidence score and detected gesture.

### Translation

- **Sign → Text**: gestures are classified into letters or phrases.
- **Text → Sign**: input text is rendered as a signed sequence.
- **Speech → Sign**: speech is transcribed then rendered as signs.
- **Sign → Speech**: detected signs are synthesised to speech.

## Examples

```bash
# Register a user via API
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"Strong#Pass1","name":"Alice"}'
```

## Troubleshooting

| Symptom                               | Resolution                                |
|---------------------------------------|-------------------------------------------|
| Webcam stream is black                | Grant camera permission in the browser.   |
| `prisma: command not found`           | Run `pnpm install` at the repo root.      |
| 401 errors after login                | Verify `JWT_ACCESS_SECRET` is set.        |
| CI fails on coverage                  | Add tests for the new code paths.         |
