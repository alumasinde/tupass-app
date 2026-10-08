import { NextResponse } from "next/server";
import { getTenantContext, TenantNotFoundError } from "@/lib/tenant/request";

export async function GET() {
  try {
    const tenant = await getTenantContext();
    return NextResponse.json({
      data: {
        organizationId: tenant.organizationId.toString(),
        organizationSlug: tenant.organizationSlug,
        organizationName: tenant.organizationName,
        hostname: tenant.hostname,
      },
    });
  } catch (error) {
    if (error instanceof TenantNotFoundError) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Unable to resolve tenant" }, { status: 500 });
  }
}
