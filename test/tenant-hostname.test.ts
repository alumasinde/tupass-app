import test from "node:test";
import assert from "node:assert/strict";

process.env.APP_BASE_DOMAIN = "tupass.localhost";
process.env.TENANT_HOST_MODE = "both";

const { normalizeHostname, extractTenantSlug, isPlatformHostname } = await import("../src/lib/tenant/hostname.ts");

test("normalizes hostnames", () => {
  assert.equal(normalizeHostname("Demo.TuPass.Localhost:3000."), "demo.tupass.localhost");
});

test("extracts a tenant slug from a configured subdomain", () => {
  assert.equal(extractTenantSlug("demo.tupass.localhost:3000"), "demo");
});

test("does not treat the base domain as a tenant", () => {
  assert.equal(extractTenantSlug("tupass.localhost:3000"), null);
  assert.equal(isPlatformHostname("tupass.localhost:3000"), true);
});
