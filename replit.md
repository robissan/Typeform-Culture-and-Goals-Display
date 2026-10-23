# Typeform Commons

A screen-first office prototype that brings Typeform culture, company progress, and aggregate barception data into a shared experience.

## Run & Operate

- `pnpm --filter @workspace/company-culture-display run dev` — managed web workflow. Requires `PORT` and `BASE_PATH` (the artifact sets `PORT=23987` and `BASE_PATH=/`).
- `pnpm --filter @workspace/company-culture-display run typecheck` — web type check
- `pnpm --filter @workspace/company-culture-display test` — sample math and chapter query tests
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

- `artifacts/company-culture-display` — the office display. Chapters live in `src/components/kiosk/`. Sample content and derived captions live in `src/data/kiosk-data.ts`, `kiosk-metrics.ts`, and `kiosk-url.ts`.
- `artifacts/company-culture-display/src/index.css` — kiosk layout. The face is Arial because a licensed TW Lausanne file is not in the repo.
- `artifacts/api-server` — `GET /api/healthz` only. The display does not call it.
- `lib/db` — empty schema. No live tables.

## Architecture decisions

- This is a digital prototype, not a confirmed Typeform deployment. No business API, employee-content source, or sensor interface has been specified.
- Metrics and beverage readings must remain explicitly illustrative until approved sources are connected. Culture profiles are fictional examples.
- Beverage signals are aggregate-only, experimental, and never evidence of individual productivity or employee performance.

## Product

Typeform Commons is five full-screen chapters for an unattended office display: People, Culture, Revenue, Users, and Barception. Chapters advance on their own. One Pause control freezes motion and rotation together. A Chapters control opens the staff list. People and Culture tell one fictional story at a time. Revenue draws monthly recurring revenue as a route. Users states the monthly-active-user count and shuffles three playful words. Barception opens on the coffee-to-beer comparison, with a glasses view on the same shared serving scale.

Every figure is an illustrative sample. People and quotes are fictional. Beverage counts are aggregate servings, not a comment on any person. The display does not call a Typeform API or any other live feed. If the sample fails to parse, the frame says the sample is missing.

## User preferences

- Use different screens instead of placing all content on one screen.
- Apply Typeform's branding and design style; make the data more artistic and simplify it so it is easy to understand. The user rejected conventional metric rings, dot grids, and culture cards as too bland.
- Use dynamic text and individuality-focused stories for people, with a separate screen celebrating collective culture. Treat the supplied references as living data-art posters, not dashboard layouts.
- Revenue should resemble a journey; MAU should playfully mix words; barception should show animated coffee and beer with interesting, valid consumption insights.

## Gotchas

- `vite.config.ts` throws unless `PORT` and `BASE_PATH` are set. The display artifact sets `PORT=23987` and `BASE_PATH=/`.
- Sample numbers are validated in `src/data/kiosk-data.ts`. Do not hardcode a second copy of a caption in a chapter; derive it with `revenueFigures` or `beverageReport`.
- `?screen=` must be `people`, `culture`, `revenue`, `users`, or `barception`. Anything else opens People and announces that the chapter was not found. `month` and `view` are written only while Barception is showing.
- Barception’s comparison uses the selected month and its neighbor. The ratio belongs to the selected month. A zero beer count has no ratio. A zero target does not divide.
- Pause stops story timers, word shuffle, and the 20-second chapter rotation. It also stops them while the browser tab is hidden. Reduced motion starts paused.
- The API server and database packages are not sources for this screen. Leave `/api/healthz` as it is until a real source is approved.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
