import { useEffect, useState } from 'react'
import { navItems } from '../data/navigation'
import { site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { ButtonLink } from './ButtonLink'
import { Icon } from './Icon'

const sectionIds = navItems.map((item) => item.id)

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const linkClass = (isActive: boolean) =>
    `block rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-accent-soft text-accent'
        : 'text-muted hover:bg-surface-muted hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} — Bytes by Aly, back to top`}
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-accent text-[0.7rem] font-bold tracking-tight text-accent-contrast"
          >
            {site.initials}
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Bytes by Aly
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={linkClass(isActive)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink
            href={site.resumeUrl}
            download
            variant="secondary"
            className="px-4 py-2"
            icon={<Icon name="download" className="size-4" />}
          >
            Resume
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-ink transition-colors hover:bg-surface-muted md:hidden"
        >
          <Icon name={isOpen ? 'close' : 'menu'} className="size-5" />
        </button>
      </div>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-line bg-canvas shadow-lg md:hidden"
        >
          <nav aria-label="Primary mobile" className="px-5 py-3 sm:px-8">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`${linkClass(isActive)} px-4 py-3`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <ButtonLink
              href={site.resumeUrl}
              download
              variant="secondary"
              className="mt-2 mb-2 w-full"
              icon={<Icon name="download" className="size-4" />}
            >
              Download Resume
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
