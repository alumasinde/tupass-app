import { prisma } from "@/lib/db/client";

export async function getSystemHealth() {
  const startedAt = performance.now();

  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok" as const,
    database: "ok" as const,
    latencyMs: Math.round((performance.now() - startedAt) * 100) / 100,
    checkedAt: new Date().toISOString(),
  };
}
