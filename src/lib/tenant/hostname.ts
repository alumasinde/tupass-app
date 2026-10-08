import { tenantConfig } from "@/config/tenant";

/** Lower-cases, strips the port and any trailing dot. IPv6 literals are preserved. */
export function normalizeHostname(value: string): string {
  let host = value.trim().toLowerCase();

  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    return end === -1 ? host : host.slice(0, end + 1);
  }

  const colon = host.indexOf(":");
  if (colon !== -1) host = host.slice(0, colon);
  return host.replace(/\.+$/, "");
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
