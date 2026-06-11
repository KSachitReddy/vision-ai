import type { TranslationType } from "@prisma/client";
import { translationRepository } from "../repositories/translationRepository.js";
import { classifyLandmarks } from "../ai/gestureClassifier.js";
import { prisma } from "../config/prisma.js";

const SIGN_PHRASES: Record<string, string> = {
  HELLO: "Hello",
  THANK_YOU: "Thank you",
  YES: "Yes",
  NO: "No",
};

function textToSignSequence(text: string): string {
  return text
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .map((word) => (SIGN_PHRASES[word] ? `[${word}]` : word.split("").join("-")))
    .join(" / ");
}

export const translationService = {
  async signToText(userId: string, landmarksCsv: string) {
    const landmarks = JSON.parse(landmarksCsv) as number[][];
    const { label, confidence } = classifyLandmarks(landmarks);
    const output = SIGN_PHRASES[label] ?? label;
    return translationRepository.create(userId, "SIGN_TO_TEXT", landmarksCsv, output, confidence);
  },

  async textToSign(userId: string, text: string) {
    const output = textToSignSequence(text);
    return translationRepository.create(userId, "TEXT_TO_SIGN", text, output, 1);
  },

  async speechToSign(userId: string, transcript: string) {
    const output = textToSignSequence(transcript);
    return translationRepository.create(userId, "SPEECH_TO_SIGN", transcript, output, 0.95);
  },

  async signToSpeech(userId: string, landmarksCsv: string) {
    const landmarks = JSON.parse(landmarksCsv) as number[][];
    const { label, confidence } = classifyLandmarks(landmarks);
    const output = SIGN_PHRASES[label] ?? label;
    return translationRepository.create(userId, "SIGN_TO_SPEECH", landmarksCsv, output, confidence);
  },

  list(userId: string, page: number, pageSize: number) {
    return translationRepository.list(userId, (page - 1) * pageSize, pageSize);
  },

  count(userId: string) {
    return translationRepository.count(userId);
  },

  async stats(userId: string) {
    const [total, byType, lastSession] = await Promise.all([
      prisma.translation.count({ where: { userId } }),
      prisma.translation.groupBy({
        by: ["type"],
        where: { userId },
        _count: { _all: true },
      }),
      prisma.recognitionSession.findFirst({
        where: { userId },
        orderBy: { startedAt: "desc" },
      }),
    ]);
    return { total, byType, lastSession };
  },
};

export function createTranslation(
  userId: string,
  type: TranslationType,
  input: string,
) {
  switch (type) {
    case "SIGN_TO_TEXT":
      return translationService.signToText(userId, input);
    case "TEXT_TO_SIGN":
      return translationService.textToSign(userId, input);
    case "SPEECH_TO_SIGN":
      return translationService.speechToSign(userId, input);
    case "SIGN_TO_SPEECH":
      return translationService.signToSpeech(userId, input);
  }
}
