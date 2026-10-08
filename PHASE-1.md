# TuPass Phase 1 — Implementation Notes

## Included

- Next.js 16 App Router foundation
- TypeScript strict configuration
- Prisma ORM 7 with MySQL/MariaDB adapter
- Versioned migration `0001_foundation`
- `organizations` tenant boundary
- `users` identity model with `first_name` and `last_name`
- `identification_types` configuration table
- Environment validation with Zod
- Centralized app error type and HTTP response handling
- Structured JSON logger
- Singleton Prisma client lifecycle
- Database health endpoint: `GET /api/health`
- Dedicated styles folder: `src/styles`
- Production-oriented README and local MySQL setup

## Deliberately not included

- Authentication UI/session implementation
- Roles, permissions and RBAC UI
- Tenant resolution middleware
- Gate passes
- Approval workflows
- Visitors
- QR codes
- Check-in/check-out
- Assets/returnables
- Platform subscriptions

Those belong to later phases and will be built on this foundation.

## Tenant-ready rule

The `Organization` model exists now, but Phase 1 does not pretend tenant resolution is complete. Phase 2 will establish the trusted request-to-organization resolution layer before tenant-owned business modules are introduced.
