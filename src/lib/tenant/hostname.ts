import { tenantConfig } from "@/config/tenant";

export function normalizeHostname(value: string): string {
  return value.trim().toLowerCase().split(":")[0].replace(/\.$/, "");
}

export function isPlatformHostname(hostname: string): boolean {
  const host = normalizeHostname(hostname);
  return host === normalizeHostname(tenantConfig.APP_BASE_DOMAIN) || host === "localhost";
}

export function extractTenantSlug(hostname: string): string | null {
  const host = normalizeHostname(hostname);
  const base = normalizeHostname(tenantConfig.APP_BASE_DOMAIN);

  if (isPlatformHostname(host)) return null;
  if (tenantConfig.TENANT_HOST_MODE === "domain") return null;
  if (!host.endsWith(`.${base}`)) return null;

  const prefix = host.slice(0, -(base.length + 1));
  if (!prefix || prefix.includes(".")) return null;
  return prefix;
}
