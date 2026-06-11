import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { authRouter } from "./routes/auth.js";
import { translationRouter } from "./routes/translations.js";
import { userRouter } from "./routes/users.js";
import { adminRouter } from "./routes/admin.js";
import { recognitionRouter } from "./routes/recognition.js";
import openapi from "./config/openapi.json" with { type: "json" };

export function createApp(): Express {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN.split(",").map((s) => s.trim()), credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(pinoHttp({ logger }));
  app.use("/api", apiLimiter);

  app.get("/api/health", (_req, res) =>
    res.json({ status: "ok", service: "signbridge-api", timestamp: new Date().toISOString() }),
  );

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
  app.get("/openapi.json", (_req, res) => res.json(openapi));

  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/translations", translationRouter);
  app.use("/api/recognition", recognitionRouter);
  app.use("/api/admin", adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
