import { describe, expect, it } from "vitest";
import { AppError, Errors } from "../apps/api/src/utils/errors";

describe("AppError", () => {
  it("captures status, code, message", () => {
    const e = new AppError(418, "TEAPOT", "I'm a teapot");
    expect(e.status).toBe(418);
    expect(e.code).toBe("TEAPOT");
    expect(e.message).toBe("I'm a teapot");
  });
  it("factory helpers", () => {
    expect(Errors.badRequest("x").status).toBe(400);
    expect(Errors.unauthorized().status).toBe(401);
    expect(Errors.forbidden().status).toBe(403);
    expect(Errors.notFound().status).toBe(404);
    expect(Errors.conflict("x").status).toBe(409);
    expect(Errors.internal().status).toBe(500);
  });
});
