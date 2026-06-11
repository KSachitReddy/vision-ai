import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { validateBody } from "../middleware/validate.js";
import { authenticate } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";
import {
  loginSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  refreshSchema,
  registerSchema,
} from "../validation/schemas.js";

export const authRouter = Router();

authRouter.post("/register", authLimiter, validateBody(registerSchema), authController.register);
authRouter.post("/login", authLimiter, validateBody(loginSchema), authController.login);
authRouter.post("/refresh", validateBody(refreshSchema), authController.refresh);
authRouter.post("/logout", validateBody(refreshSchema), authController.logout);
authRouter.post(
  "/password-reset/request",
  authLimiter,
  validateBody(passwordResetRequestSchema),
  authController.requestReset,
);
authRouter.post(
  "/password-reset",
  authLimiter,
  validateBody(passwordResetSchema),
  authController.reset,
);
authRouter.get("/me", authenticate, authController.me);
