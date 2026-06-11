import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { adminController } from "../controllers/adminController.js";
import { z } from "zod";
import { validateBody } from "../middleware/validate.js";

const setRoleSchema = z.object({ role: z.enum(["USER", "MODERATOR", "ADMIN"]) });

export const adminRouter = Router();
adminRouter.use(authenticate, authorize("ADMIN"));

adminRouter.get("/users", adminController.listUsers);
adminRouter.patch("/users/:id/role", validateBody(setRoleSchema), adminController.setRole);
adminRouter.get("/audit-logs", adminController.auditLogs);
adminRouter.get("/health", adminController.health);
