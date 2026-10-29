import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  tone?: 'neutral' | 'accent'
}

export function Tag({ children, tone = 'neutral' }: TagProps) {
  const tones = {
    neutral: 'border-forest/10 bg-blush text-forest',
    accent: 'border-forest bg-cream text-forest',
  } as const

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm hover:shadow-md motion-safe:transition-transform motion-safe:duration-150 motion-safe:hover:-translate-y-1 ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
