import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(120),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email(),
});

export const passwordResetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8).max(128),
});

export const translationCreateSchema = z.object({
  type: z.enum(["SIGN_TO_TEXT", "TEXT_TO_SIGN", "SPEECH_TO_SIGN", "SIGN_TO_SPEECH"]),
  input: z.string().min(1).max(5000),
});

export const accessibilityPrefSchema = z.object({
  highContrast: z.boolean().optional(),
  largeText: z.boolean().optional(),
  reduceMotion: z.boolean().optional(),
  captionLanguage: z.string().min(2).max(8).optional(),
  signLanguage: z.string().min(2).max(8).optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const recognitionFrameSchema = z.object({
  landmarks: z.array(z.array(z.number()).length(3)).min(1).max(50),
});
