import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  API_HOST: z.string().default("0.0.0.0"),
  API_PORT: z.coerce.number().int().positive().default(8080),
  DATABASE_URL: z.string().default("postgresql://signbridge:signbridge@localhost:5432/signbridge"),
  JWT_ACCESS_SECRET: z.string().min(16).default("dev-access-secret-change-me-please-1234"),
  JWT_REFRESH_SECRET: z.string().min(16).default("dev-refresh-secret-change-me-please-1234"),
  JWT_ACCESS_TTL: z.string().default("15m"),
  JWT_REFRESH_TTL: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(120),
  LOG_LEVEL: z.string().default("info"),
});

export const env = schema.parse(process.env);
export type Env = z.infer<typeof schema>;
