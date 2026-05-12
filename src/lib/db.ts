import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalPrisma = global as unknown as { prisma: PrismaClient };
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = globalPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalPrisma.prisma = prisma;
}

export default prisma;
