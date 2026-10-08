import test from "node:test";
import assert from "node:assert/strict";

process.env.APP_BASE_DOMAIN = "tupass.localhost";
process.env.TENANT_HOST_MODE = "both";

const { normalizeHostname, extractTenantSlug, isPlatformHostname } = await import(
  "../src/lib/tenant/hostname"
);

test("normalizes hostnames", () => {
  assert.equal(normalizeHostname("Demo.TuPass.Localhost:3000"), "demo.tupass.localhost");
  assert.equal(normalizeHostname("demo.tupass.localhost.:3000"), "demo.tupass.localhost");
  assert.equal(normalizeHostname("  EXAMPLE.com. "), "example.com");
});

test("preserves IPv6 literals when stripping the port", () => {
  assert.equal(normalizeHostname("[::1]:3000"), "[::1]");
});

test("extracts a tenant slug from a configured subdomain", () => {
  assert.equal(extractTenantSlug("demo.tupass.localhost:3000"), "demo");
});

test("rejects nested subdomains and unrelated hosts", () => {
  assert.equal(extractTenantSlug("a.b.tupass.localhost"), null);
  assert.equal(extractTenantSlug("demo.other.com"), null);
  assert.equal(extractTenantSlug("evil-tupass.localhost"), null);
});

test("does not treat the base domain as a tenant", () => {
  assert.equal(extractTenantSlug("tupass.localhost:3000"), null);
  assert.equal(isPlatformHostname("tupass.localhost:3000"), true);
  assert.equal(isPlatformHostname("localhost:3000"), true);
  assert.equal(isPlatformHostname("demo.tupass.localhost"), false);
});
