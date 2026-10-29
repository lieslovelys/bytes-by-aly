import { site } from '../data/site'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {currentYear} {site.name} · Bytes by Aly
        </p>
        <p>Built with React, TypeScript &amp; Tailwind CSS.</p>
      </div>
    </footer>
  )
}
