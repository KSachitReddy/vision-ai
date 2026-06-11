import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { translationCreateSchema } from "../validation/schemas.js";
import { translationController } from "../controllers/translationController.js";

export const translationRouter = Router();
translationRouter.use(authenticate);

translationRouter.post("/", validateBody(translationCreateSchema), translationController.create);
translationRouter.get("/", translationController.list);
translationRouter.get("/stats", translationController.stats);
