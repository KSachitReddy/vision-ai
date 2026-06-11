import { prisma } from "../config/prisma.js";
import type { Prisma, User, UserRole } from "@prisma/client";

export const userRepository = {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },
  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },
  create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  },
  update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },
  list(skip: number, take: number): Promise<User[]> {
    return prisma.user.findMany({ skip, take, orderBy: { createdAt: "desc" } });
  },
  count(): Promise<number> {
    return prisma.user.count();
  },
  setRole(id: string, role: UserRole): Promise<User> {
    return prisma.user.update({ where: { id }, data: { role } });
  },
  remove(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  },
};
