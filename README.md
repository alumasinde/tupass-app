# TuPass — Gate Pass Management SaaS

Production-oriented foundation for a multi-tenant Gate Pass Management SaaS built with Next.js, TypeScript, MySQL and Prisma ORM.

## Foundation scope (Phase 1)

- Next.js App Router foundation
- TypeScript strict mode
- MySQL + Prisma ORM 7
- Environment validation
- Structured application logging
- Centralized application errors
- Database client lifecycle suitable for development and production
- Health-check endpoint
- Tenant-ready `organizations` boundary
- Global `users` identity model using `first_name` and `last_name`
- Dedicated application styles under `src/styles`
- Versioned Prisma migration
- Local Windows-friendly setup

Business modules such as authentication screens, RBAC, visitors, gate passes, approvals, QR workflows, and platform administration belong to later phases.

## Requirements

- Node.js 22+
- MySQL 8.x
- npm

Prisma ORM 7 requires a database driver adapter. This project uses the Prisma MariaDB adapter for MySQL-compatible connections.

## 1. Create the MySQL database

Using MySQL CLI:

```sql
CREATE DATABASE tupass CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tupass'@'localhost' IDENTIFIED BY 'change-me';
GRANT ALL PRIVILEGES ON tupass.* TO 'tupass'@'localhost';
FLUSH PRIVILEGES;
```

If you already have a MySQL user, you can use that instead.

## 2. Configure environment

Copy:

```text
.env.example -> .env
```

Then update the MySQL credentials. `DATABASE_URL` is the only database setting; host, port, user and password are parsed from it.

Example:

```env
DATABASE_URL=mysql://tupass:change-me@127.0.0.1:3306/tupass
APP_BASE_DOMAIN=tupass.localhost
TENANT_HOST_MODE=both
```

Do not commit `.env`.

## 3. Install dependencies

```bash
npm install
```

## 4. Validate and generate Prisma Client

```bash
npm run db:validate
npm run db:generate
```

## 5. Apply migrations

For local development:

```bash
npm run db:migrate
```

For an already-created migration set in deployment:

```bash
npm run db:deploy
```

## 6. Start the application

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/api/health
```

## 7. Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Architecture rules

1. Tenant-owned data must always carry an `organization_id` once introduced.
2. Never trust a tenant identifier supplied by the browser. Tenant context must be derived and validated server-side.
3. Business rules belong in modules/services, not React components.
4. Environment-specific values belong in `.env` and typed configuration.
5. Do not use database ENUMs for configurable business values.
6. People use `first_name` and `last_name`; do not introduce generic `name` fields for people.
7. Styles belong under `src/styles` and should not be scattered through business modules.
8. Database access belongs behind server-side infrastructure/services.
9. Do not expose database credentials or internal errors to clients.
10. Every later tenant-scoped query must include an organization boundary enforced by the server.

## Phase 2

Phase 2 adds multi-tenant hostname resolution. See `PHASE-2.md`.

Tenant domains are stored in `organization_domains`; application code does not hard-code tenant names or domains.
