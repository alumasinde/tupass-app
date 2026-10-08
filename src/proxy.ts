import { NextResponse, type NextRequest } from "next/server";
import { isPlatformHostname, normalizeHostname } from "@/lib/tenant/hostname";
import { tenantConfig } from "@/config/tenant";

export function proxy(request: NextRequest) {
  const hostname = normalizeHostname(request.headers.get("host") ?? "");
  const base = normalizeHostname(tenantConfig.APP_BASE_DOMAIN);

  if (!hostname) {
    return NextResponse.json({ error: "Missing host header" }, { status: 400 });
  }

  const isBaseDomain = isPlatformHostname(hostname);
  const isTenantSubdomain = hostname.endsWith(`.${base}`) && hostname !== base;

  if (tenantConfig.TENANT_HOST_MODE === "subdomain" && !isBaseDomain && !isTenantSubdomain) {
    return NextResponse.json({ error: "Unsupported host" }, { status: 400 });
  }

  if (tenantConfig.TENANT_HOST_MODE === "domain" && isTenantSubdomain) {
    return NextResponse.json({ error: "Unsupported host" }, { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
