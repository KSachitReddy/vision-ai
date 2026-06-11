import { describe, expect, it } from "vitest";
import {
  registerSchema,
  loginSchema,
  translationCreateSchema,
  recognitionFrameSchema,
  paginationSchema,
} from "../apps/api/src/validation/schemas";

describe("validation schemas", () => {
  it("accepts a valid registration", () => {
    expect(() =>
      registerSchema.parse({ email: "a@b.co", password: "longpassword", name: "A" }),
    ).not.toThrow();
  });

  it("rejects short passwords", () => {
    expect(() =>
      registerSchema.parse({ email: "a@b.co", password: "short", name: "A" }),
    ).toThrow();
  });

  it("accepts login data", () => {
    expect(() => loginSchema.parse({ email: "a@b.co", password: "x" })).not.toThrow();
  });

  it("validates translation create", () => {
    expect(() =>
      translationCreateSchema.parse({ type: "TEXT_TO_SIGN", input: "hello" }),
    ).not.toThrow();
    expect(() =>
      translationCreateSchema.parse({ type: "BAD", input: "x" }),
    ).toThrow();
  });

  it("validates frame payload", () => {
    const ok = recognitionFrameSchema.parse({
      landmarks: [[0, 0, 0], [1, 1, 0]],
    });
    expect(ok.landmarks.length).toBe(2);
  });

  it("applies pagination defaults", () => {
    const p = paginationSchema.parse({});
    expect(p.page).toBe(1);
    expect(p.pageSize).toBe(20);
  });
});
