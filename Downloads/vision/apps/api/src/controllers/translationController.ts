import type { Request, Response } from "express";
import { createTranslation, translationService } from "../services/translationService.js";

export const translationController = {
  async create(req: Request, res: Response) {
    const userId = req.user!.sub;
    const t = await createTranslation(userId, req.body.type, req.body.input);
    res.status(201).json(t);
  },
  async list(req: Request, res: Response) {
    const userId = req.user!.sub;
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 20);
    const [items, total] = await Promise.all([
      translationService.list(userId, page, pageSize),
      translationService.count(userId),
    ]);
    res.json({ items, total, page, pageSize });
  },
  async stats(req: Request, res: Response) {
    const userId = req.user!.sub;
    res.json(await translationService.stats(userId));
  },
};
