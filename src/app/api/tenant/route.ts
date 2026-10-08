import { getTenantContext, TenantNotFoundError } from "@/lib/tenant/request";
import { AppError } from "@/lib/errors/app-error";
import { toErrorResponse } from "@/lib/errors/http";
import { logger, serializeError } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tenant = await getTenantContext();
    return Response.json({
      data: {
        organizationId: tenant.organizationId.toString(),
        organizationSlug: tenant.organizationSlug,
        organizationName: tenant.organizationName,
        hostname: tenant.hostname,
      },
    });
  } catch (error) {
    if (error instanceof TenantNotFoundError) {
      return toErrorResponse(new AppError("Tenant not found.", "TENANT_NOT_FOUND", 404));
    }
    logger.error("Tenant resolution failed", { error: serializeError(error) });
    return toErrorResponse(error);
  }
}
