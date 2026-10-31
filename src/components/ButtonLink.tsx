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
    '',
  secondary:
    'button-secondary',
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
      className={`button ${variants[variant]} ${className}`}
    >
      {icon && iconPosition === 'left' ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? icon : null}
    </a>
  )
}
