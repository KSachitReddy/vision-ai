import type { Request, Response } from "express";
import { authService } from "../services/authService.js";

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body.email, req.body.password, req.body.name);
    res.status(201).json(result);
  },
  async login(req: Request, res: Response) {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  },
  async refresh(req: Request, res: Response) {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  },
  async logout(req: Request, res: Response) {
    const result = await authService.logout(req.body.refreshToken);
    res.json(result);
  },
  async requestReset(req: Request, res: Response) {
    const result = await authService.requestPasswordReset(req.body.email);
    res.json(result);
  },
  async reset(req: Request, res: Response) {
    const result = await authService.resetPassword(req.body.token, req.body.password);
    res.json(result);
  },
  me(req: Request, res: Response) {
    res.json({ user: req.user });
  },
};
