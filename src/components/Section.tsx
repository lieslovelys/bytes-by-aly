import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  labelledBy: string
  children: ReactNode
  className?: string
}

export function Section({
  id,
  labelledBy,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-20 py-20 sm:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  )
}
