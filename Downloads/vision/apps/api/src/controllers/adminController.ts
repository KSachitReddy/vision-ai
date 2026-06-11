import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { publicUser } from "../services/authService.js";
import { userRepository } from "../repositories/userRepository.js";
import type { UserRole } from "@prisma/client";

export const adminController = {
  async listUsers(req: Request, res: Response) {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 20);
    const [items, total] = await Promise.all([
      userRepository.list((page - 1) * pageSize, pageSize),
      userRepository.count(),
    ]);
    res.json({ items: items.map(publicUser), total, page, pageSize });
  },
  async setRole(req: Request, res: Response) {
    const result = await userRepository.setRole(req.params.id, req.body.role as UserRole);
    res.json(publicUser(result));
  },
  async auditLogs(_req: Request, res: Response) {
    const items = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    res.json({ items });
  },
  async health(_req: Request, res: Response) {
    res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
  },
};
