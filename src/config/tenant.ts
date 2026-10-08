import { z } from "zod";

// Kept separate from environment.ts so the proxy and pure tenant helpers
// do not require database configuration just to run.
const tenantConfigSchema = z.object({
  APP_BASE_DOMAIN: z.string().min(1, "APP_BASE_DOMAIN is required"),
  TENANT_HOST_MODE: z.enum(["subdomain", "domain", "both"]).default("both"),
});

export const tenantConfig = Object.freeze(
  tenantConfigSchema.parse({
    APP_BASE_DOMAIN: process.env.APP_BASE_DOMAIN,
    TENANT_HOST_MODE: process.env.TENANT_HOST_MODE || undefined,
  }),
);
