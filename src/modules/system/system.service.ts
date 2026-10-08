import "server-only";

import { prisma } from "@/lib/db/client";
import { AppError } from "@/lib/errors/app-error";
import { logger, serializeError } from "@/lib/logger";

export async function getSystemHealth() {
  const startedAt = performance.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    logger.error("Health check failed: database unreachable", { error: serializeError(error) });
    throw new AppError("Database is unavailable.", "DATABASE_UNAVAILABLE", 503);
  }

  return {
    status: "ok" as const,
    database: "ok" as const,
    latencyMs: Math.round((performance.now() - startedAt) * 100) / 100,
    checkedAt: new Date().toISOString(),
  };
}
