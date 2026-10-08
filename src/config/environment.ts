import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .refine((value) => /^mysql:\/\//i.test(value), "DATABASE_URL must start with mysql://"),
  APP_NAME: z.string().min(1).default("TuPass"),
  APP_BASE_DOMAIN: z.string().min(1, "APP_BASE_DOMAIN is required"),
  TENANT_HOST_MODE: z.enum(["subdomain", "domain", "both"]).default("both"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

const parsed = environmentSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  APP_NAME: process.env.APP_NAME || undefined,
  APP_BASE_DOMAIN: process.env.APP_BASE_DOMAIN,
  TENANT_HOST_MODE: process.env.TENANT_HOST_MODE || undefined,
  LOG_LEVEL: process.env.LOG_LEVEL || undefined,
});

if (!parsed.success) {
  const problems = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${problems}`);
}

export const env = Object.freeze(parsed.data);
export type Env = typeof env;
