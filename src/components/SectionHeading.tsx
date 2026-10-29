import type { LucideIcon } from 'lucide-react'

interface SectionHeadingProps {
  id: string
  icon: LucideIcon
  eyebrow?: string
  title: string
  subtitle?: string
  level?: 'h1' | 'h2'
}

export function SectionHeading({
  id,
  icon: HeadingIcon,
  eyebrow,
  title,
  subtitle,
  level: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <header className={`group/heading max-w-2xl ${id === 'hero-title' ? 'mb-4 motion-safe:animate-fade-up' : 'mb-6 md:mb-8'}`}>
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 rounded-full bg-blush px-2.5 py-1 text-label font-semibold tracking-widest text-forest uppercase">
          {eyebrow}
        </p>
      ) : null}
      <div className="mt-2 flex items-center gap-2">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-forest motion-safe:transition-transform motion-safe:hover:rotate-6 motion-safe:group-data-[visible=true]/heading:animate-wiggle">
          <HeadingIcon className={`h-5 w-5 ${id === 'hero-title' ? 'motion-safe:animate-float' : ''}`} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <Heading
            id={id}
            className={Heading === 'h1'
              ? 'text-2xl leading-tight font-bold tracking-tight text-balance md:text-4xl'
              : 'text-lg leading-tight font-bold tracking-tight text-balance md:text-2xl'}
          >
            {title}
          </Heading>
        </div>
      </div>
      {subtitle ? (
        <p className="mt-2 pl-12 text-sm leading-relaxed text-forest dark:text-cream">{subtitle}</p>
      ) : null}
    </header>
  )
}
