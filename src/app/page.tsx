import { StatusCard } from "@/components/common/status-card";
import { appConfig } from "@/config/app";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="eyebrow">Phase 1 · Foundation</div>
        <h1>{appConfig.name}</h1>
        <p>
          A production-oriented foundation for a configurable, multi-tenant gate pass management platform.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="/api/health">System health</a>
        </div>
      </section>

      <section className="status-grid" aria-label="Foundation status">
        <StatusCard label="Framework" value="Next.js" description="App Router + TypeScript" />
        <StatusCard label="Database" value="MySQL" description="Prisma ORM foundation" />
        <StatusCard label="Architecture" value="Tenant-ready" description="Organization boundary established" />
        <StatusCard label="Styling" value="Dedicated" description="All application styles live in src/styles" />
      </section>
    </main>
  );
}
