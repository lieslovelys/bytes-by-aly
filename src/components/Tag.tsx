import type { ReactNode } from 'react'
export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'accent' }) {
  return <span className={`tag ${tone === 'accent' ? 'border-accent/30 bg-tint text-accent' : ''}`}>{children}</span>
}
