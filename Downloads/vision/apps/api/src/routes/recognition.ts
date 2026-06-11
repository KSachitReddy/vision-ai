import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { recognitionFrameSchema } from "../validation/schemas.js";
import { recognizeFrame } from "../ai/mediapipe.js";
import { normalizeLandmarks } from "../ai/opencv.js";

export const recognitionRouter = Router();
recognitionRouter.use(authenticate);

recognitionRouter.post("/frame", validateBody(recognitionFrameSchema), (req, res) => {
  const normalized = normalizeLandmarks(req.body.landmarks);
  const result = recognizeFrame({ landmarks: normalized, timestamp: Date.now() });
  res.json(result);
});
