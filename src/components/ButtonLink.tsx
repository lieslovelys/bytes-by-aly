import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  download?: boolean
  className?: string
  ariaLabel?: string
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-transparent bg-accent text-accent-contrast hover:bg-accent-hover',
  secondary:
    'border border-line bg-surface text-ink hover:border-accent/50 hover:bg-accent-soft hover:text-accent',
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  download = false,
  className = '',
  ariaLabel,
}: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href)

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      {...(download ? { download: '' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {icon && iconPosition === 'left' ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? icon : null}
    </a>
  )
}
