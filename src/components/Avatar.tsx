import { useState } from 'react'
import { site } from '../data/site'

interface AvatarProps {
  size: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-14 w-14 text-lg md:h-16 md:w-16 md:text-xl',
  lg: 'h-20 w-20 text-xl md:h-24 md:w-24 md:text-2xl',
} as const

export function Avatar({ size, className = '' }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const dimension = size === 'lg' ? 96 : size === 'md' ? 64 : 40
  const avatarClass = `shrink-0 border-2 border-blush ring-2 ring-blush/60 ring-offset-2 ring-offset-forest-dark ${size === 'lg' ? 'rounded-3xl' : 'rounded-full'} ${sizes[size]} ${className}`

  if (failed) {
    return (
      <span className={`flex items-center justify-center bg-blush font-bold text-forest ${avatarClass}`} role="img" aria-label="Alyssa Mae Esponilla">
        {site.initials}
      </span>
    )
  }

  return (
    <img
      src="/images/aly.jpg"
      alt="Photo of Alyssa Mae Esponilla"
      width={dimension}
      height={dimension}
      loading={size === 'md' ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover object-[50%_30%] ${avatarClass}`}
    />
  )
}
