import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Errors } from "../utils/errors.js";
import type { UserRole } from "@prisma/client";

export interface AuthPayload {
  sub: string;
  email: string;
  role: UserRole;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthPayload;
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw Errors.unauthorized("Missing bearer token");
  }
  const token = header.slice("Bearer ".length);
  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthPayload;
    next();
  } catch {
    throw Errors.unauthorized("Invalid or expired token");
  }
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) throw Errors.unauthorized();
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      throw Errors.forbidden("Insufficient role");
    }
    next();
  };
}
