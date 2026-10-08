import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  APP_BASE_DOMAIN: z.string().min(1),
  TENANT_HOST_MODE: z.enum(["subdomain", "domain", "both"]).default("both"),
});

export const environment = environmentSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  APP_BASE_DOMAIN: process.env.APP_BASE_DOMAIN,
  TENANT_HOST_MODE: process.env.TENANT_HOST_MODE ?? "both",
});
