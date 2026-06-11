/**
 * MediaPipe Hands adapter (server-side stub).
 *
 * The real-time MediaPipe pipeline executes in the browser (see
 * `apps/web/src/lib/mediapipe.ts`); this server module accepts the resulting
 * landmark payloads and forwards them to the classifier.
 */

import { classifyLandmarks, type ClassificationResult } from "./gestureClassifier.js";

export interface HandLandmarkFrame {
  landmarks: number[][];
  timestamp: number;
}

export function recognizeFrame(frame: HandLandmarkFrame): ClassificationResult {
  return classifyLandmarks(frame.landmarks);
}
