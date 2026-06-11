import { describe, expect, it } from "vitest";
import {
  classifyLandmarks,
  centroid,
  spread,
} from "../apps/api/src/ai/gestureClassifier";
import { normalizeLandmarks } from "../apps/api/src/ai/opencv";
import { recognizeFrame } from "../apps/api/src/ai/mediapipe";

const sampleLandmarks: number[][] = Array.from({ length: 21 }, (_, i) => [
  Math.sin(i) * 0.5 + 0.5,
  Math.cos(i) * 0.5 + 0.5,
  0.1,
]);

describe("gestureClassifier", () => {
  it("returns a valid gesture for empty input", () => {
    const r = classifyLandmarks([]);
    expect(r.label).toBe("A");
    expect(r.confidence).toBe(0);
  });

  it("computes centroid", () => {
    const [cx, cy] = centroid([
      [0, 0, 0],
      [1, 1, 0],
    ]);
    expect(cx).toBe(0.5);
    expect(cy).toBe(0.5);
  });

  it("computes non-negative spread", () => {
    expect(spread(sampleLandmarks)).toBeGreaterThan(0);
  });

  it("classifies into a known label with bounded confidence", () => {
    const r = classifyLandmarks(sampleLandmarks);
    expect(["A", "B", "C", "HELLO", "THANK_YOU", "YES", "NO"]).toContain(r.label);
    expect(r.confidence).toBeGreaterThanOrEqual(0);
    expect(r.confidence).toBeLessThanOrEqual(1);
  });
});

describe("normalizeLandmarks", () => {
  it("scales coordinates into 0..1", () => {
    const n = normalizeLandmarks(sampleLandmarks);
    for (const [x, y] of n) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(1);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(1);
    }
  });
  it("handles empty arrays", () => {
    expect(normalizeLandmarks([])).toEqual([]);
  });
});

describe("recognizeFrame", () => {
  it("delegates to classifier", () => {
    const r = recognizeFrame({ landmarks: sampleLandmarks, timestamp: 0 });
    expect(r.label).toBeDefined();
  });
});
