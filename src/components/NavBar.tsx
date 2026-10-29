import { FolderCode, GraduationCap, Heart, Mail, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems } from '../data/navigation'
import { Avatar } from './Avatar'
import { useActiveSection } from '../hooks/useActiveSection'

const icons: Record<string, LucideIcon> = {
  about: Heart,
  education: GraduationCap,
  projects: FolderCode,
  skills: Wrench,
  contact: Mail,
}
const tabs = navItems
const sectionIds = tabs.map((item) => item.id)

export function NavBar() {
  const activeId = useActiveSection(sectionIds)
  const activeIndex = Math.max(0, tabs.findIndex((item) => item.id === activeId))
  const ActiveIcon = icons[tabs[activeIndex].id]
  const [moving, setMoving] = useState(false)
  const [ripple, setRipple] = useState(0)
  useEffect(() => {
    setMoving(true)
    const timer = window.setTimeout(() => setMoving(false), 500)
    return () => window.clearTimeout(timer)
  }, [activeIndex])

  return (
    <>
      <header className="bg-forest text-cream">
        <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center px-4 py-4 sm:px-6 md:min-h-24 md:py-5">
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 overflow-visible rounded-full focus-visible:outline-blush motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-105 md:gap-3"
            aria-label="Bytes by Aly, back to top"
          >
            <Avatar size="md" />
            <span className="overflow-visible pr-1 font-script text-3xl leading-none font-normal tracking-tight whitespace-nowrap text-cream md:text-4xl">Bytes by Aly</span>
          </a>
        </div>
      </header>

      <nav
        aria-label="Sections"
        data-active={activeIndex}
        className="fixed bottom-4 left-1/2 z-50 h-16 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-3xl [container-type:inline-size] motion-safe:animate-bar-enter [--active-index:0] data-[active=1]:[--active-index:1] data-[active=2]:[--active-index:2] data-[active=3]:[--active-index:3] data-[active=4]:[--active-index:4] [--tab-width:20%] [--tab-step:20cqw]"
      >
        <div aria-hidden="true" className="absolute inset-0 rounded-3xl border border-forest/10 bg-cream shadow-lg shadow-forest/15 dark:border-cream/20 dark:bg-forest-dark" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-full w-[var(--tab-width)]"
        >
          <span className="absolute -top-7 left-1/2 h-18 w-18 translate-x-[calc(var(--active-index)*var(--tab-step)-50%)] rounded-full bg-cream motion-safe:transition-transform motion-safe:duration-500 motion-safe:delay-75 motion-safe:ease-spring dark:bg-forest-dark" />
          <span className="absolute top-0 left-1/2 flex h-14 w-14 translate-x-[calc(var(--active-index)*var(--tab-step)-50%)] -translate-y-5 items-center justify-center rounded-full bg-blush text-forest shadow-md shadow-forest/20 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-spring">
            <span key={activeId} data-moving={moving} className="grid size-full place-items-center rounded-full motion-safe:data-[moving=true]:animate-squash">
              <ActiveIcon key={activeId} className="h-6 w-6 motion-safe:animate-icon-pop" strokeWidth={1.75} aria-hidden="true" />
              {ripple > 0 && <span key={ripple} className="absolute inset-0 rounded-full bg-blush motion-safe:animate-ripple motion-reduce:hidden" />}
            </span>
          </span>
        </div>

        <ul className="relative flex h-full items-center">
          {tabs.map((item) => {
            const TabIcon = icons[item.id]
            const isActive = activeId === item.id
            return (
              <li key={item.id} className="h-full min-w-0 flex-1">
                <a
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  onClick={() => setRipple((value) => value + 1)}
                  aria-current={isActive ? 'location' : undefined}
                  className="group relative flex h-full min-h-11 min-w-11 items-center justify-center rounded-3xl text-forest focus-visible:outline-forest dark:text-cream dark:focus-visible:outline-blush"
                >
                  <TabIcon className={`h-6 w-6 motion-safe:transition-[transform,opacity] motion-safe:duration-150 ${isActive ? 'opacity-0' : 'opacity-60 group-hover:opacity-100 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-110 motion-safe:group-active:scale-90'}`} strokeWidth={1.75} aria-hidden="true" />
                  <span className={isActive ? 'absolute bottom-1 left-1/2 -translate-x-1/2 text-label whitespace-nowrap motion-safe:animate-label-enter' : 'sr-only'}>{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
