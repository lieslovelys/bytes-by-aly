import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  tone?: 'neutral' | 'accent'
}

export function Tag({ children, tone = 'neutral' }: TagProps) {
  const tones = {
    neutral: 'border-line/80 bg-surface-muted text-muted',
    accent: 'border-accent/20 bg-accent-soft text-accent',
  } as const

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
