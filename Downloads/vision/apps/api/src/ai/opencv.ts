/**
 * OpenCV-compatible preprocessing utilities.
 *
 * Provides pure-TS helpers used to normalise landmark coordinates before they
 * reach the classifier. Designed to be replaceable by a wasm-OpenCV binding.
 */

export function normalizeLandmarks(landmarks: number[][]): number[][] {
  if (landmarks.length === 0) return landmarks;
  const xs = landmarks.map((p) => p[0]);
  const ys = landmarks.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  return landmarks.map(([x, y, z]) => [(x - minX) / rangeX, (y - minY) / rangeY, z]);
}
