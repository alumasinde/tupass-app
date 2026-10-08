import { z } from "zod";

const tenantConfigSchema = z.object({
  APP_BASE_DOMAIN: z.string().min(1),
  TENANT_HOST_MODE: z.enum(["subdomain", "domain", "both"]).default("both"),
});

export const tenantConfig = tenantConfigSchema.parse({
  APP_BASE_DOMAIN: process.env.APP_BASE_DOMAIN,
  TENANT_HOST_MODE: process.env.TENANT_HOST_MODE ?? "both",
});
