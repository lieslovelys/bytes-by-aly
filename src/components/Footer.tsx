import { site } from '../data/site'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-forest py-6 pb-28 text-cream/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-1 px-4 text-center text-xs sm:px-6 lg:flex-row lg:justify-between lg:text-left">
        <p>
          © {currentYear} {site.name} · Bytes by Aly
        </p>
        <p>Built with React, TypeScript &amp; Tailwind CSS.</p>
      </div>
    </footer>
  )
}
