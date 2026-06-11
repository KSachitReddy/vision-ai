import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

const app = createApp();
const server = app.listen(env.API_PORT, env.API_HOST, () => {
  logger.info({ port: env.API_PORT, host: env.API_HOST }, "SignBridge API listening");
});

const shutdown = (signal: string): void => {
  logger.info({ signal }, "Shutting down");
  server.close(() => process.exit(0));
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
