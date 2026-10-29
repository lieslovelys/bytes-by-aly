# Bytes by Aly

A personal portfolio and online resume for **Alyssa Mae I. Esponilla**, a
fourth-year BS Computer Engineering student at the University of Rizal System
(URS) Antipolo Campus and aspiring Web Developer.

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
│   ├── site.ts          # Name, title, intro, email, socials, resume URL
│   ├── navigation.ts    # Section links
│   ├── hero.ts          # Hero badges, facts, current focus
│   ├── about.ts         # Career objective and quick facts
│   ├── education.ts     # Degree and focus areas
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

- **Contact details:** update `src/data/site.ts`. The email, GitHub, and
  LinkedIn values shipped with the site are placeholders — replace them with the
  real accounts before deploying.
- **Projects:** `src/data/projects.ts` supplies initial seed content; after seeding,
  edit D1 rows through reviewed SQL migrations. GitHub/demo buttons use D1 URL fields.
  S.O.R.S and AdGen are explicitly marked placeholders: confirm their descriptions
  and stacks before publishing.
- **Resume:** replace `public/resume.pdf` with the real PDF. The file is served
  from `/resume.pdf` and linked in the nav and Contact section.
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

- `wrangler.jsonc`: Worker, SPA assets, local D1 binding `DB`.
- `src/worker/index.ts`: API, validation, security headers, abuse protection.
- `src/worker/db/schema.ts`: strict TypeScript Drizzle schema.
- `drizzle.config.ts`, `migrations/`: generated SQLite migrations.
- `scripts/seed.ts`: idempotent local seed, including all existing project cards.
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

Seeding twice does not duplicate rows and does not overwrite existing rows.
Local Wrangler commands and Vite share `.wrangler/state`; no Cloudflare login or
real database ID is needed locally. Never commit secrets, `.env`, or `.dev.vars`.
If pnpm reports ignored dependency build scripts, review them with
`pnpm approve-builds` and approve only trusted required dependencies.

## Remote setup and deployment (run manually when ready)

```bash
pnpm exec wrangler login
pnpm exec wrangler d1 create bytes-by-aly
```

Replace the placeholder `database_id` in `wrangler.jsonc` with the returned ID.
Then, deliberately targeting your remote database:

```bash
pnpm db:migrate:remote
pnpm build
pnpm deploy
```

`deploy` runs `wrangler deploy`; build first. Local seed data is not uploaded.
Populate production projects/skills with reviewed SQL via Wrangler when ready;
`db:seed` intentionally only targets local D1. `pnpm preview` runs the built
Worker and assets locally. No remote commands were run during implementation.

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
a row. Repeat seeding and check counts: 5 projects, 8 skills. In the browser,
check form feedback and section loading states; block API requests in DevTools
to test Retry, and use an empty local table to check the empty state.

Contact accepts at most five attempts per IP per minute per Worker isolate,
with a bounded in-memory map, request size limit, same-origin check, and honeypot.
The rate limit resets on isolate restart and is not shared between isolates;
it is best-effort protection, not a distributed anti-spam guarantee.
