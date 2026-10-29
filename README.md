# Bytes by Aly

A personal portfolio and online resume for **Alyssa Mae I. Esponilla**, a
fourth-year BS Computer Engineering student at the University of Rizal System
(URS) Antipolo Campus and aspiring Web Developer.

Built with React, TypeScript, Vite, and Tailwind CSS. Single page, responsive,
system-aware dark mode, no backend.

## Requirements

- Node.js 20.19+ (or 22.12+)
- pnpm 9+

## Setup

```bash
pnpm install
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

Components never hardcode content: every section reads from the typed data
files in `src/data`. Adding a project is as simple as adding another object to
the `projects` array.

## Editing content

- **Contact details:** update `src/data/site.ts`. The email, GitHub, and
  LinkedIn values shipped with the site are placeholders — replace them with the
  real accounts before deploying.
- **Projects:** edit `src/data/projects.ts`. Set `links` to include GitHub or
  demo buttons; leave the array empty to hide the button row.
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
   - The nav switches to a menu button below 768px; the menu opens, links
     scroll to their sections, and Escape closes it.
   - Hero, project cards, skills, and contact stack cleanly with no clipped
     text or buttons.
   - Tabbing through the page shows a visible focus ring on every link/button.
   - Toggle the OS light/dark appearance and reload; colors update and text
     stays readable.

## Notes

The site is frontend-only. Contact uses `mailto:` and external social links —
there is no form, authentication, database, or API.
