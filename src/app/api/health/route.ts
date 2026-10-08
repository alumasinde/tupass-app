import { getSystemHealth } from "@/modules/system/system.service";
import { toErrorResponse } from "@/lib/errors/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const health = await getSystemHealth();
    return Response.json(health, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
