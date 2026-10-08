import "server-only";

import { headers } from "next/headers";
import { resolveTenantByHostname, type TenantContext } from "@/lib/tenant/resolve";

export class TenantNotFoundError extends Error {
  constructor(hostname: string) {
    super(`No active organization is configured for hostname: ${hostname}`);
    this.name = "TenantNotFoundError";
  }
}

export async function getTenantContext(): Promise<TenantContext> {
  const requestHeaders = await headers();
  const hostname = requestHeaders.get("host");
  if (!hostname) throw new TenantNotFoundError("unknown");

  const tenant = await resolveTenantByHostname(hostname);
  if (!tenant) throw new TenantNotFoundError(hostname);
  return tenant;
}
