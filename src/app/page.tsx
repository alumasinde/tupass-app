import { getTenantContext } from "@/lib/tenant/request";

export default async function HomePage() {
  try {
    const tenant = await getTenantContext();

    return (
      <main className="app-shell">
        <section className="card">
          <p className="eyebrow">TuPass • Phase 2</p>
          <h1>{tenant.organizationName}</h1>
          <p className="muted">Tenant resolution is active for this organization.</p>
          <div className="tenant-meta">
            <span>Slug</span><strong>{tenant.organizationSlug}</strong>
            <span>Host</span><strong>{tenant.hostname}</strong>
            <span>Organization ID</span><strong>{tenant.organizationId.toString()}</strong>
          </div>
        </section>
      </main>
    );
  } catch {
    return (
      <main className="app-shell">
        <section className="card">
          <p className="eyebrow">TuPass • Platform</p>
          <h1>Gate Pass Management</h1>
          <p className="muted">This hostname is not mapped to an active organization.</p>
          <p className="hint">Use a configured tenant hostname such as your local tenant domain.</p>
        </section>
      </main>
    );
  }
}
