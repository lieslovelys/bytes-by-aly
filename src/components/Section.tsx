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
      className={`section ${className}`}
    >
      {id !== 'about' && id !== 'contact' && <div className="bg-art bg-art-section" aria-hidden="true"><span className="bg-grid" /><span className="bg-glow bg-glow-right" /></div>}
      <div className="shell">{children}</div>
    </section>
  )
}
