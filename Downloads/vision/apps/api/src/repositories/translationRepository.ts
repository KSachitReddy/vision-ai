import { prisma } from "../config/prisma.js";
import type { Translation, TranslationType } from "@prisma/client";

export const translationRepository = {
  create(
    userId: string,
    type: TranslationType,
    input: string,
    output: string,
    confidence: number,
  ): Promise<Translation> {
    return prisma.translation.create({
      data: { userId, type, input, output, confidence },
    });
  },
  list(userId: string, skip: number, take: number): Promise<Translation[]> {
    return prisma.translation.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });
  },
  count(userId: string): Promise<number> {
    return prisma.translation.count({ where: { userId } });
  },
  remove(id: string, userId: string): Promise<Translation | null> {
    return prisma.translation
      .delete({ where: { id, userId } })
      .catch(() => null);
  },
};
