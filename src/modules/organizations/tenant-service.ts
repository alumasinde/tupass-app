import "server-only";

import { prisma } from "@/lib/db/client";
import { normalizeHostname } from "@/lib/tenant/hostname";

export async function getOrganizationBySlug(slug: string) {
  return prisma.organization.findFirst({
    where: { slug, isActive: true },
    include: { domains: { where: { isActive: true } } },
  });
}

export async function getOrganizationByDomain(hostname: string) {
  return prisma.organizationDomain.findFirst({
    where: {
      hostname: normalizeHostname(hostname),
      isActive: true,
      organization: { isActive: true },
    },
    include: { organization: true },
  });
}
