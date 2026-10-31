import { ArrowUp } from 'lucide-react'
import { site } from '../data/site'
import { contact } from '../data/contact'
import { Icon } from './Icon'
import { BrandLogo } from './BrandLogo'

const year = new Date().getFullYear()

export function Footer() {
  return <footer className="site-footer border-t border-line">
    <div className="shell footer-content">
      <div>
        <BrandLogo />
        <p className="text-xs">{site.location}</p>
      </div>
      <div className="text-xs">
        <p>© {year} {site.name}</p>
        <p className="mt-1">Built with React, TypeScript &amp; Tailwind CSS.</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1">
        {(['email', 'github', 'linkedin', 'telegram'] as const).map((key) => <a key={key} href={contact[key]} target={key === 'email' ? undefined : '_blank'} rel={key === 'email' ? undefined : 'noopener noreferrer'} aria-label={key === 'email' ? `Email ${site.email}` : `${key === 'github' ? 'GitHub' : key === 'linkedin' ? 'LinkedIn' : 'Telegram'}, opens in a new tab`} className="grid size-11 place-items-center border border-line"><Icon name={key === 'email' ? 'mail' : key} /></a>)}
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 px-2 text-xs"><ArrowUp className="size-4" aria-hidden="true" />Back to top</a>
      </div>
    </div>
  </footer>
}
