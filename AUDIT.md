# Resume content audit — before / after

The supplied resume is the source of truth. Design, dependencies, schema, API
architecture, and port 3000 are unchanged. This audit was reported before edits.

| Location | Before | After (resume requirement) |
| --- | --- | --- |
| `src/data/site.ts` | Short name “Aly Esponilla” | Alyssa Mae I. Esponilla |
| `site.ts`, `index.html`, `README.md`, education data | Fourth-year claim | Removed; resume only establishes expected graduation in 2027 |
| `site.ts`, metadata, README | Aspiring Web Developer; title omitted role | Entry-level Web Developer, as specified in career objective |
| `site.ts`, `hero.ts`, `about.ts` | Antipolo City, Rizal residence | Angono, Rizal, Philippines |
| `site.ts` | Previous email address | Canonical email from `src/data/contact.ts` |
| `site.ts` | Previous GitHub profile | Canonical GitHub URL from `src/data/contact.ts` |
| `site.ts` | Previous LinkedIn profile | Canonical LinkedIn URL from `src/data/contact.ts` |
| `about.ts` | Objective beginning “To obtain an entry-level Web Developer position…” | Exact objective beginning “To join a collaborative development team…” through “…users and the organization.” |
| `hero.ts` | “Building URStamp…” under Currently | Removed unsupported current-work claim; shows supplied academic achievement instead |
| `About.tsx` | Personal claim about breaking down real-world processes and usability without a manual | Removed; not in resume |
| `education.ts`, `Education.tsx` | Only abbreviated BS Computer Engineering; hardcoded Bachelor of Science label; invented four-year program/current-year description | Full Bachelor of Science in Computer Engineering; University of Rizal System – Antipolo Campus; Expected Graduation: 2027 |
| Education | Missing STEM entry | Science, Technology, Engineering, and Mathematics (STEM); Sumulong College of Arts and Sciences - Antipolo City; 2021-2023 |
| Education | Invented focus areas: Web Development, Database Systems, Software Engineering, Computer Networks | Removed |
| `projects.ts` | URStamp before payroll | Payroll, URStamp, URS S.O.R.S, AdGen, EduPro, Wooden Bizarre, in resume order |
| Payroll data/seed | “Automated Payroll System”; seed shortened it to “Automated Payroll System for URS”; paraphrased description | Exact full resume title including “— Thesis Project”; exact supplied description; React.js, PostgreSQL, Biometric Device |
| URStamp data/seed | “URStamp”; paraphrased description about replacing manual sign-ins; React; seed replaced D1 (SQLite) with D1 | Exact full event-management title and supplied description; React.js, TypeScript, Tailwind CSS, Cloudflare Workers, D1 (SQLite), Drizzle ORM |
| S.O.R.S data | “S.O.R.S”; unconfirmed context, placeholder description and stack | URS S.O.R.S (Student Online Resource Site); exact supplied description; PHP, HTML, MySQL |
| AdGen data | “AdGen”; unconfirmed context, placeholder description and stack | AdGen – AI Instant Video Ad Generator; exact supplied description; Node.js, Firebase |
| Projects | Invented portfolio project with React, TypeScript, Tailwind CSS, Vite | Removed from typed data and seeded D1 |
| Projects | Missing EduPro | EduPro — Online DSA Library; exact supplied description; PHP, HTML, MySQL |
| Projects | Missing Wooden Bizarre | Wooden Bizarre Management System; exact supplied description; React.js, PostgreSQL |
| `Projects.tsx` | “personal experiments” claim | Removed unsupported description |
| `skills.ts` | Frontend, Backend, Databases, Tools groups with invented summaries | Exact four resume groups, no invented summaries |
| Typed skills | Unsupported TypeScript, Cloudflare Workers, Drizzle ORM, REST APIs, SQLite, Cloudflare D1, Git, Vite, VS Code | Removed as personal skills (project/implementation stacks remain accurate) |
| Typed skills | React, HTML5, CSS3 variants | React.js, HTML, CSS |
| Typed skills | Missing C++, Python, Node.js, Vercel, Figma, Jira, MySQL, Firebase; all core competencies and AI tools missing | Added exact resume entries |
| Seed skills | Frontend: React, TypeScript, Tailwind CSS; Databases: PostgreSQL, SQLite, D1; Tools & Cloud: Git/GitHub, Cloudflare Workers | All 24 skills in Languages & Web Tools, Platforms & Databases, Core Competencies, AI & Development Tools, in resume order |
| Page/navigation | Missing Academic Achievements | System Making 1st place – URStamp (2026), dedicated section and navigation link |
| Certifications & Training | No existing entries or section | Explicit empty typed list; section hidden while empty |
| `scripts/seed.ts` | ON CONFLICT DO NOTHING left stale rows unchanged | Upsert canonical rows, remove obsolete resume content, clear unverified project links; never modify messages |
| Navbar, Contact, `public/resume.pdf` | Download links to a generated RESUME PLACEHOLDER PDF | Removed placeholder file and unverified download links |
| `index.html` | Title/social title omitted role; unsupported year and generic social description | Full correct name and entry-level role in title and descriptions |
| `README.md` | Claimed contact links were placeholders; S.O.R.S/AdGen unconfirmed; obsolete PDF instructions, education structure, seed no-overwrite behavior, counts 5/8 | Correct contacts, confirmed resume data, privacy rule, achievements/empty certifications, no download, upsert behavior, counts 6/24 |

Full legal name in the original main heading/footer/author metadata was already
correct. No phone or street address was found. Public read APIs only expose
projects and skills; messages have no public read route. No Vite starter page or
Vite logos remained. The generated placeholder PDF was the remaining template
content. Copyright year and database timestamps are implementation metadata,
not claimed resume dates or achievements.

## Verification

- `pnpm exec tsc -b`: passed.
- `pnpm db:migrate`: passed locally.
- `pnpm db:seed` twice: passed; exact API comparison confirms 6 projects and
  24 skills, with unique IDs and no duplicate content after the second run.
- `/api/projects`: every title, description, stack, order, and null project link
  matches typed resume data.
- `/api/skills`: every category, name, and order matches typed resume data.
- `pnpm build`: passed.
- Chromium at 375px and 1440px: all seven page sections render, two education
  entries, six projects, four skill groups/24 skills, exact achievement,
  certifications hidden, correct social links, no horizontal overflow or runtime
  errors. Mobile menu opens and Escape closes it.
- Screenshots: `/tmp/opencode/portfolio-375.png`, `/tmp/opencode/portfolio-1440.png`.
- `git diff --check`: passed.

Port 3000 already had the workspace server running; verification used it without
stopping it or changing the port. All D1 changes were local; no remote migration,
seed, or deployment was run.
