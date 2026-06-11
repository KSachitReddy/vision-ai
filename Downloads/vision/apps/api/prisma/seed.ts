import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const adminPasswordHash = await bcrypt.hash("Admin#Pass1", 12);

  await prisma.user.upsert({
    where: { email: "admin@signbridge.dev" },
    update: {},
    create: {
      email: "admin@signbridge.dev",
      passwordHash: adminPasswordHash,
      name: "System Administrator",
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  const gestures = [
    { label: "A", category: "alphabet" },
    { label: "B", category: "alphabet" },
    { label: "C", category: "alphabet" },
    { label: "HELLO", category: "phrase" },
    { label: "THANK_YOU", category: "phrase" },
    { label: "YES", category: "phrase" },
    { label: "NO", category: "phrase" },
  ];

  for (const g of gestures) {
    await prisma.gesture.upsert({
      where: { label: g.label },
      update: {},
      create: g,
    });
  }

  await prisma.systemConfiguration.upsert({
    where: { key: "minConfidence" },
    update: {},
    create: { key: "minConfidence", value: "0.65" },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
