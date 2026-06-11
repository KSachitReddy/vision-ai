import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { accessibilityPrefSchema } from "../validation/schemas.js";
import { prisma } from "../config/prisma.js";
import { publicUser } from "../services/authService.js";
import { userRepository } from "../repositories/userRepository.js";
import { Errors } from "../utils/errors.js";

export const userRouter = Router();
userRouter.use(authenticate);

userRouter.get("/me", async (req, res) => {
  const user = await userRepository.findById(req.user!.sub);
  if (!user) throw Errors.notFound("User not found");
  res.json(publicUser(user));
});

userRouter.get("/me/preferences", async (req, res) => {
  const prefs = await prisma.accessibilityPreference.findUnique({
    where: { userId: req.user!.sub },
  });
  res.json(prefs ?? null);
});

userRouter.put("/me/preferences", validateBody(accessibilityPrefSchema), async (req, res) => {
  const userId = req.user!.sub;
  const data = req.body;
  const upsert = await prisma.accessibilityPreference.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
  res.json(upsert);
});
