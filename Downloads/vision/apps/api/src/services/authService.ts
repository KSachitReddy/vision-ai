import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { env } from "../config/env.js";
import { userRepository } from "../repositories/userRepository.js";
import { refreshTokenRepository } from "../repositories/refreshTokenRepository.js";
import { Errors } from "../utils/errors.js";
import type { User, UserRole } from "@prisma/client";

const ACCESS_TTL = env.JWT_ACCESS_TTL as SignOptions["expiresIn"];
const REFRESH_TTL_MS = parseTtl(env.JWT_REFRESH_TTL);

function parseTtl(ttl: string): number {
  const match = /^(\d+)([smhd])$/.exec(ttl);
  if (!match) return 7 * 24 * 60 * 60 * 1000;
  const value = Number(match[1]);
  const unit = match[2];
  const mult = unit === "s" ? 1000 : unit === "m" ? 60_000 : unit === "h" ? 3_600_000 : 86_400_000;
  return value * mult;
}

function signAccess(user: Pick<User, "id" | "email" | "role">): string {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_TTL },
  );
}

async function issueTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = signAccess(user);
  const refreshToken = jwt.sign({ sub: user.id, jti: uuid() }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_TTL as SignOptions["expiresIn"],
  });
  await refreshTokenRepository.create(user.id, refreshToken, new Date(Date.now() + REFRESH_TTL_MS));
  return { accessToken, refreshToken };
}

export const authService = {
  async register(email: string, password: string, name: string) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw Errors.conflict("Email already registered");
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await userRepository.create({ email, passwordHash, name });
    const tokens = await issueTokens(user);
    return { user: publicUser(user), ...tokens };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw Errors.unauthorized("Invalid credentials");
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw Errors.unauthorized("Invalid credentials");
    const tokens = await issueTokens(user);
    return { user: publicUser(user), ...tokens };
  },

  async refresh(refreshToken: string) {
    let payload: jwt.JwtPayload;
    try {
      payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
    } catch {
      throw Errors.unauthorized("Invalid refresh token");
    }
    const stored = await refreshTokenRepository.findValid(refreshToken);
    if (!stored) throw Errors.unauthorized("Refresh token revoked");
    const user = await userRepository.findById(String(payload.sub));
    if (!user) throw Errors.unauthorized("User no longer exists");

    await refreshTokenRepository.revoke(stored.id);
    const tokens = await issueTokens(user);
    return { user: publicUser(user), ...tokens };
  },

  async logout(refreshToken: string) {
    const stored = await refreshTokenRepository.findValid(refreshToken);
    if (stored) await refreshTokenRepository.revoke(stored.id);
    return { success: true };
  },

  async requestPasswordReset(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) return { success: true };
    const token = jwt.sign({ sub: user.id, purpose: "reset" }, env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    return { success: true, token };
  },

  async resetPassword(token: string, password: string) {
    let payload: jwt.JwtPayload;
    try {
      payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as jwt.JwtPayload;
    } catch {
      throw Errors.unauthorized("Invalid reset token");
    }
    if (payload.purpose !== "reset") throw Errors.unauthorized("Invalid reset token");
    const passwordHash = await bcrypt.hash(password, 12);
    await userRepository.update(String(payload.sub), { passwordHash });
    await refreshTokenRepository.revokeAllForUser(String(payload.sub));
    return { success: true };
  },

  async setRole(targetUserId: string, role: UserRole) {
    return publicUser(await userRepository.setRole(targetUserId, role));
  },
};

export function publicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  };
}
