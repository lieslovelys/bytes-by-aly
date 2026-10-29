# Bytes by Aly

A personal portfolio and online resume for **Alyssa Mae I. Esponilla**, a
BS Computer Engineering student at the University of Rizal System – Antipolo Campus
(Expected Graduation: 2027) and entry-level Web Developer based in Angono, Rizal, Philippines.

Built with React, TypeScript, Vite, and Tailwind CSS. Single page, responsive,
system-aware dark mode, and a Cloudflare Workers + D1 backend using Drizzle.
Routing uses plain typed fetch handlers (no extra routing dependency).

## Requirements

- Node.js 20.19+ (or 22.12+)
- pnpm 9+

## Setup

```bash
pnpm i
pnpm db:migrate
pnpm db:seed
pnpm dev
```

The dev server runs at **http://localhost:3000**.

## Scripts

```bash
pnpm dev       # start the Vite dev server on port 3000
pnpm build     # type-check with tsc and build for production (dist/)
pnpm preview   # preview the production build locally
pnpm lint      # run Oxlint
```

## Project structure

```text
src/
├── components/          # Shared UI: navbar, footer, section shell, tags, icons
├── data/                # All site content lives here, fully typed
│   ├── site.ts          # Name, title, intro, email, socials
│   ├── navigation.ts    # Section links
│   ├── hero.ts          # Hero badges, facts, current focus
│   ├── about.ts         # Career objective and quick facts
│   ├── education.ts     # BS Computer Engineering and STEM education
│   ├── achievements.ts  # Achievement shown in the hero profile card
│   ├── projects.ts      # Project cards (edit or add entries here)
│   └── skills.ts        # Skill groups and tags
├── features/            # One folder per page section
│   ├── hero/
│   ├── about/
│   ├── education/
│   ├── projects/
│   ├── skills/
│   └── contact/
├── hooks/               # Scroll-spy hook for the sticky nav
├── App.tsx
├── index.css            # Tailwind import, theme tokens, reduced motion
└── main.tsx
```

Projects and skills load from D1 through public read-only API endpoints.
Other sections use typed data files. Project presentation metadata (highlights,
featured status, context) stays in `src/data/projects.ts` to retain the design.

## Editing content

- **Contact links:** `src/data/contact.ts` is the typed source of truth for
  Email, Telegram, GitHub, and LinkedIn; `src/data/site.ts` imports these values.
  Publish only Angono, Rizal, Philippines and email; no phone or street address.
- **Projects and skills:** edit the typed resume data in `src/data/projects.ts`
  and `src/data/skills.ts`, then run `pnpm db:seed` locally. The seven projects
  retain resume order; the 25 skills retain the four exact resume groups.
  No project repository/demo links are supplied in the resume.
- **Profile card achievement:** System Making 1st place – URStamp (2026),
  maintained in `src/data/achievements.ts`.
- **Resume download:** omitted because no verified, privacy-safe PDF was supplied.
- **Favicon:** `public/favicon.svg`.
- **Theme:** accent, surface, text, and line colors are defined as CSS
  variables in `src/index.css`, with a `prefers-color-scheme: dark` override.
  Dark mode follows the operating system automatically.
- **Metadata:** page title, description, and social meta tags live in
  `index.html`.

## Accessibility and responsiveness

- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`)
  and labelled sections.
- Skip-to-content link, visible focus outlines, `aria-label` on icon-only
  links, `aria-current` for the active nav item, and a keyboard-dismissible
  mobile menu.
- Color tokens are chosen for contrast in both light and dark mode.
- Layout is designed from 375px up, with no horizontal overflow.
- Animations and smooth scrolling are disabled when
  `prefers-reduced-motion: reduce` is set.

### Verifying at 375px, 768px, and desktop

1. Run `pnpm dev`, open http://localhost:3000.
2. Open DevTools → Toggle device toolbar.
3. Check **375 × 812**, **768 × 1024**, and **1440 × 900** (or full desktop).
4. At each width confirm:
   - The page never scrolls sideways (`document.documentElement.scrollWidth === document.documentElement.clientWidth` in the console).
   - The nav switches to a menu button below 1024px; the menu opens, links
     scroll to their sections, and Escape closes it.
   - Hero, project cards, skills, and contact stack cleanly with no clipped
     text or buttons.
   - Tabbing through the page shows a visible focus ring on every link/button.
   - Toggle the OS light/dark appearance and reload; colors update and text
     stays readable.

## Notes

Contact saves messages in D1; email and social links remain alternatives.
Messages have no public read endpoint. There is no authentication or admin UI.

## Backend files and schema

- `wrangler.jsonc`: Worker, SPA assets, D1 binding `DB` (local or remote).
- `src/worker/index.ts`: API, validation, security headers, abuse protection.
- `src/worker/db/schema.ts`: strict TypeScript Drizzle schema.
- `drizzle.config.ts`, `migrations/`: generated SQLite migrations.
- `scripts/seed.ts`: local content sync and insert-only remote seed.
- `worker-configuration.d.ts`, `tsconfig.worker.json`: generated runtime/binding types and Worker type checking.
- `src/hooks/useApiList.ts`, `src/components/ListStatus.tsx`: pure reducer and fetch/status UI.
- `src/features/contact/ContactForm.tsx`: accessible contact form.

Tables:
- `projects`: text primary key `id`, `title`, unique `slug`, `description`, JSON-text
  `stack`, nullable `githubUrl`/`demoUrl`, integer `sortOrder`, timestamp `createdAt`.
- `skills`: text primary key `id`, `category`, `name`, integer `sortOrder`;
  unique category/name pair.
- `messages`: autoincrement integer `id`, `name`, `email`, `message`, timestamp `createdAt`.

`pnpm db:generate` generates migrations after schema changes. `pnpm cf-typegen`
regenerates bindings after Wrangler configuration changes. `pnpm exec tsc -b`
checks frontend, Worker, configuration, and seed code.

Local seeding twice does not duplicate rows. It updates existing resume rows, removes
obsolete projects/skills, and clears unverified project links. Remote seeding only
inserts missing projects/skills; conflicts on primary or unique keys are skipped.
It never updates or deletes existing rows. Review production edits separately:
rerunning the remote seed will not publish changes to existing content. Messages
are untouched by either seed. Other portfolio sections remain bundled typed data.
Local Wrangler commands and Vite share `.wrangler/state`; no Cloudflare login or
real database ID is needed locally. Never commit secrets, `.env`, or `.dev.vars`.
If pnpm reports ignored dependency build scripts, review them with
`pnpm approve-builds` and approve only trusted required dependencies.

## Remote setup and deployment (run manually when ready)

1. Create a Cloudflare account, verify your email, and install dependencies.
   Use **Workers**, not a Pages deployment, for this Vite + Worker project.

```bash
pnpm install --frozen-lockfile
pnpm exec wrangler login
pnpm exec wrangler whoami
pnpm exec wrangler d1 create bytes-by-aly
```

2. This project now has a real database ID configured. For a different account,
   replace `database_id` in `wrangler.jsonc` with the returned real ID.
   If the database already exists, use
   `pnpm exec wrangler d1 list` and select its ID instead of creating another.
   Keep the binding `DB` and match `database_name` to your database.
   Do not add `remote: true`: local development should keep using local D1.

3. Apply the existing migrations, seed production, check, build, and deploy:

```bash
pnpm db:migrate:remote
pnpm db:seed:remote
pnpm lint
pnpm build
pnpm exec wrangler deploy --dry-run
pnpm run deploy
```

`db:migrate` / `db:seed` are **local only**. The `:remote` commands deliberately
write to Cloudflare D1. Migration tracking prevents reapplying existing migrations;
do not manually recreate tables or delete migration history. For an existing
database with tables but no migration history, inspect/back up and reconcile its
schema before applying these migrations. Back up existing production data first.

`deploy` runs `wrangler deploy`; build first, especially after changing the D1 ID.
`npx wrangler deploy` is also appropriate after the build, but `pnpm run deploy`
uses this project's installed version. The Cloudflare Vite plugin writes the
Worker to `dist/bytes_by_aly` and assets to `dist/client`; Wrangler automatically
uses `.wrangler/deploy/config.json` to find the built Worker configuration.
Do not upload only `dist/client` as a static site: the API needs the Worker.
`pnpm preview` runs the built Worker and assets locally.

4. Open the URL printed by deployment. Check the portfolio, project modal,
   skills, navigation, and contact form. Check `/api/projects` and `/api/skills`.
   A successful contact submission is stored in D1, **not emailed**. No public
   messages endpoint exists. Resume download is currently unavailable: supply a
   verified privacy-safe PDF before adding a download link; no PDF is invented.

### Account, dashboard, secrets, and optional Git integration

- Authorize Wrangler in the browser and choose the correct account. If prompted,
  finish the account's Workers onboarding and choose a `workers.dev` subdomain.
- D1 creation and the `DB` binding are handled by CLI/config; no duplicate manual
  dashboard binding is necessary. Check Workers & Pages → bytes-by-aly → Settings
  → Bindings after deployment. Custom domains are optional dashboard setup.
- No runtime secret or database password is required: D1 uses `env.DB`.
  Do not put API tokens in source, Wrangler vars, or `VITE_*` variables (public).
  For future runtime secrets use `pnpm exec wrangler secret put SECRET_NAME`
  and update binding types/code as needed. Keep local secrets in ignored
  `.dev.vars`; store automation tokens only in the platform's secret storage.
- This guide uses CLI deployment and does not require GitHub integration.
  If you opt into **Workers Builds** later, verify that service's current
  configuration, permissions, and build/deploy logs; use `pnpm build` and
  `pnpm run deploy` from the repository root. Do not assume a Pages integration or
  static output-directory setting can deploy the Worker. Keep remote migrations
  and seeds as deliberate release steps rather than automatic preview writes.
- Public content includes your name, email, city, education, and social handles.
  Review these before publishing. No hardcoded credentials were found in the
  inspected tracked source; this is not a comprehensive secret-history audit.

### Current deployment

Deployed successfully to https://bytes-by-aly.esponillaalyssa.workers.dev.
The real D1 database `bytes-by-aly` is configured under binding `DB`; both
existing migrations and the remote seed succeeded. Live HTTP checks passed for
portfolio HTML/assets, 7 projects, 25 skills, valid contact submission (201),
invalid contact (400), and the private messages route (404). The test contact
was confirmed in remote D1 and retained as `Deployment verification` with
`deployment-check@example.com`; no user submissions were changed or deleted.

Use `pnpm run deploy`, not `pnpm deploy`: pnpm's built-in deploy command can
take precedence over the package script. No GitHub integration was configured,
and no commit or push was performed. Browser visual/interaction checks remain
manual; HTTP tests do not verify rendering or modal/navigation behavior.

### Preparation checks

- Passed: TypeScript + production build, Wrangler deployment dry-run (`DB` and
  `ASSETS` bindings), existing migrations on isolated local D1 and reapplication
  with no pending migrations. The two migrations match the current schema,
  including `projects.featured`; no new tables/migrations were needed.
- Passed: insert-only seed SQL produces 7 projects and 25 skills; repeating it
  preserves existing edits and messages. Local Worker serves portfolio HTML,
  project/skill APIs, valid contact (201, persisted), invalid/honeypot (400), and
  private messages route (404). Tests used isolated state, not your local DB.
- Lint exits successfully with three existing warnings in `NavBar.tsx`,
  `ProjectCard.tsx`, and `ProjectModal.tsx`; these were not rewritten.
- Completed after authorization: real D1 ID configuration, remote migrations,
  remote seed, production deployment, and live HTTP/contact persistence checks.
- Outstanding: browser visual and interaction checks and a privacy-safe resume
  PDF. No existing resume download was removed.

## Verify locally

With `pnpm dev` running on port 3000:

```bash
curl http://localhost:3000/api/projects
curl http://localhost:3000/api/skills
curl -i http://localhost:3000/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Local test","email":"test@example.com","message":"Hello","website":""}'
pnpm exec wrangler d1 execute DB --local --command "SELECT id, name, email, message FROM messages;"
curl -i http://localhost:3000/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"","email":"invalid","message":""}'
curl -i http://localhost:3000/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Bot","email":"bot@example.com","message":"Spam","website":"filled"}'
curl -i http://localhost:3000/api/messages
```

Expect ordered JSON lists, 201 for valid contact, 400 for invalid input and the
honeypot, and JSON 404 for messages/unknown API routes. Only valid contact adds
a row. Repeat seeding and check counts: 7 projects, 25 skills on a fresh database. In the browser,
check form feedback and section loading states; block API requests in DevTools
to test Retry, and use an empty local table to check the empty state.

Contact accepts at most five attempts per IP per minute per Worker isolate,
with a bounded in-memory map, request size limit, same-origin check, and honeypot.
The rate limit resets on isolate restart and is not shared between isolates;
it is best-effort protection, not a distributed anti-spam guarantee.
