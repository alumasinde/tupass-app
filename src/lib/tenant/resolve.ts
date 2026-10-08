import "server-only";

import { prisma } from "@/lib/db/client";
import { normalizeHostname } from "@/lib/tenant/hostname";

export type TenantContext = {
  organizationId: bigint;
  organizationSlug: string;
  organizationName: string;
  hostname: string;
};

export async function resolveTenantByHostname(hostname: string): Promise<TenantContext | null> {
  const normalized = normalizeHostname(hostname);
  if (!normalized) return null;

  const domain = await prisma.organizationDomain.findFirst({
    where: { hostname: normalized, isActive: true, organization: { isActive: true } },
    select: {
      organization: { select: { id: true, slug: true, name: true } },
    },
  });

  if (!domain) return null;

  return {
    organizationId: domain.organization.id,
    organizationSlug: domain.organization.slug,
    organizationName: domain.organization.name,
    hostname: normalized,
  };
}
