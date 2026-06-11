import { describe, expect, it } from "vitest";
import { GESTURE_LABELS, isGestureLabel } from "../packages/shared/src/index";
import { APP_NAME, MIN_CONFIDENCE, SUPPORTED_SIGN_LANGUAGES } from "../packages/config/src/index";
import { tfModels, getModel } from "../apps/api/src/ai/tensorflow";

describe("shared types", () => {
  it("isGestureLabel works", () => {
    expect(isGestureLabel("A")).toBe(true);
    expect(isGestureLabel("Z")).toBe(false);
    expect(GESTURE_LABELS.length).toBeGreaterThan(0);
  });
});

describe("config", () => {
  it("exports constants", () => {
    expect(APP_NAME).toBe("SignBridge");
    expect(MIN_CONFIDENCE).toBeGreaterThan(0);
    expect(SUPPORTED_SIGN_LANGUAGES.length).toBeGreaterThan(0);
  });
});

describe("tf models", () => {
  it("lists models and finds by name", () => {
    expect(tfModels.length).toBeGreaterThan(0);
    expect(getModel("signbridge-baseline")?.version).toBe("0.1.0");
    expect(getModel("unknown")).toBeUndefined();
  });
});
