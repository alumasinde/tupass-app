export type Environment = "development" | "test" | "production";

export interface TenantContext {
  organizationId: bigint;
  organizationSlug: string;
}
