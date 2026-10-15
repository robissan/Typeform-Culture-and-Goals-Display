# Typeform Commons

A screen-first office prototype that brings Typeform culture, company progress, and aggregate barception data into a shared experience.

## Run & Operate

- `pnpm --filter @workspace/company-culture-display run dev` — managed web workflow
- `pnpm --filter @workspace/company-culture-display run typecheck` — web type check
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

- This is a digital prototype, not a confirmed Typeform deployment. No business API, employee-content source, or sensor interface has been specified.
- Metrics and beverage readings must remain explicitly illustrative until approved sources are connected. Culture profiles are fictional examples.
- Beverage signals are aggregate-only, experimental, and never evidence of individual productivity or employee performance.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- Use different screens instead of placing all content on one screen.
- Apply Typeform's branding and design style; make the data more artistic and simplify it so it is easy to understand.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
