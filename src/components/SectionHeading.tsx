import type { LucideIcon } from 'lucide-react'

interface SectionHeadingProps {
  id: string
  icon: LucideIcon
  eyebrow?: string
  title: string
  subtitle?: string
  level?: 'h1' | 'h2'
}
export function SectionHeading({ id, icon: HeadingIcon, eyebrow, title, subtitle, level: Heading = 'h2' }: SectionHeadingProps) {
  return <header className="mb-[var(--content-gap)] max-w-2xl">
    {eyebrow && <p className="eyebrow mb-3 flex items-center gap-2"><HeadingIcon aria-hidden="true" className="size-4" strokeWidth={1.6} />{eyebrow}</p>}
    <Heading id={id} className="section-title">{title}</Heading>
    {subtitle && <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">{subtitle}</p>}
  </header>
}
