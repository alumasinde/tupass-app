# TuPass Phase 2 — Multi-Tenancy

Phase 2 introduces the tenant boundary without implementing authentication or business modules.

## Included

- `organization_domains` for configurable custom domains/subdomains.
- Hostname normalization.
- Configurable `APP_BASE_DOMAIN` and `TENANT_HOST_MODE`.
- Server-side tenant resolution from the request hostname.
- Tenant context helper for Server Components and Route Handlers.
- Host validation through Next.js 16 `proxy.ts`.
- Tenant API at `/api/tenant`.
- Demo tenant seed for local testing.
- No hard-coded tenant names in application logic.

## Local test

1. Ensure MySQL is running and the Phase 1 database exists.
2. Run Prisma migration:

```powershell
npm run db:migrate
```

3. Seed the demo organization/domain:

```powershell
mysql -u root -p tupass < database/phase2-seed.sql
```

4. Ensure `.env` contains:

```env
APP_BASE_DOMAIN="tupass.localhost"
TENANT_HOST_MODE="both"
```

5. Start Next.js:

```powershell
npm run dev
```

6. Open:

`http://demo.tupass.localhost:3000`

7. Verify:

`http://demo.tupass.localhost:3000/api/tenant`

## Security rule

Do not accept a client-provided `organization_id` as the tenant boundary. Tenant context is resolved from the request hostname and the server-side database mapping. Future tenant-owned queries must consume the resolved tenant context.
