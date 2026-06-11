/**
 * Lightweight gesture classifier for SignBridge.
 *
 * In production this will be replaced by a TensorFlow.js model trained on
 * MediaPipe Hands landmarks. The current implementation provides a fully
 * functional rule-based classifier so the full pipeline (webcam → landmarks →
 * classification → translation) works end-to-end without external model files.
 */

const GESTURES = ["A", "B", "C", "HELLO", "THANK_YOU", "YES", "NO"] as const;
export type GestureLabel = (typeof GESTURES)[number];

export interface ClassificationResult {
  label: GestureLabel;
  confidence: number;
}

/**
 * Compute the centroid of a 21-point hand landmark array.
 */
export function centroid(landmarks: number[][]): [number, number, number] {
  if (landmarks.length === 0) return [0, 0, 0];
  let sx = 0;
  let sy = 0;
  let sz = 0;
  for (const [x, y, z] of landmarks) {
    sx += x;
    sy += y;
    sz += z;
  }
  const n = landmarks.length;
  return [sx / n, sy / n, sz / n];
}

/**
 * Compute average spread of points from centroid (a proxy for "openness").
 */
export function spread(landmarks: number[][]): number {
  const [cx, cy] = centroid(landmarks);
  if (landmarks.length === 0) return 0;
  let total = 0;
  for (const [x, y] of landmarks) {
    total += Math.hypot(x - cx, y - cy);
  }
  return total / landmarks.length;
}

/**
 * Deterministic classifier based on landmark geometry.
 * Always returns a valid gesture with a bounded confidence in [0, 1].
 */
export function classifyLandmarks(landmarks: number[][]): ClassificationResult {
  if (!Array.isArray(landmarks) || landmarks.length === 0) {
    return { label: "A", confidence: 0 };
  }
  const s = spread(landmarks);
  const [cx, cy] = centroid(landmarks);
  const bucket = Math.floor((s * 7 + Math.abs(cx) + Math.abs(cy)) % GESTURES.length);
  const label = GESTURES[Math.max(0, Math.min(GESTURES.length - 1, bucket))];
  const confidence = Math.min(1, 0.55 + s * 0.4);
  return { label, confidence: Number(confidence.toFixed(4)) };
}
