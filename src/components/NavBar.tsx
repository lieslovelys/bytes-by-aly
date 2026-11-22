import { ArrowUpRight, FolderCode, GraduationCap, Mail, Sparkles, UserRound } from 'lucide-react'
import { navItems } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { BrandLogo } from './BrandLogo'

const sectionIds = navItems.map((item) => item.id)
const dockIcons = [UserRound, GraduationCap, FolderCode, Sparkles, Mail]

export function NavBar() {
  const activeId = useActiveSection(sectionIds)
  const activeIndex = sectionIds.indexOf(activeId ?? '')
  return <>
    <header className="top-bar absolute inset-x-0 top-0 z-50">
    <div className="shell flex min-h-20 items-center justify-between py-3 sm:gap-3">
      <BrandLogo />
      <a href="#contact" className="button shrink-0 rounded-full sm:px-5 sm:text-sm">Let’s connect <ArrowUpRight aria-hidden="true" className="size-4" /></a>
    </div>
    </header>
    <nav aria-label="Sections" className="section-dock fixed left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 rounded-full border p-1 backdrop-blur-lg sm:w-[calc(100%-2rem)] sm:p-1.5">
      <ul className="relative grid grid-cols-5 gap-0">
        {activeIndex !== -1 && (
          <li
            aria-hidden="true"
            className="dock-slider-indicator"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
        )}
        {navItems.map((item, index) => {
          const DockIcon = dockIcons[index]
          return <li key={item.id} className="min-w-0"><a href={item.href} aria-label={item.label} aria-current={activeId === item.id ? 'location' : undefined} className="dock-link flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 rounded-full px-1 py-2 text-[10px] font-medium sm:flex-row sm:gap-2 sm:py-3 sm:text-sm">{DockIcon && <DockIcon aria-hidden="true" focusable="false" className="size-4.5 shrink-0 sm:size-5" strokeWidth={1.75} />}<span className="truncate">{item.label}</span></a></li>
        })}
      </ul>
    </nav>
  </>
}
