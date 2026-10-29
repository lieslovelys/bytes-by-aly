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
    'border border-blush bg-blush text-forest hover:bg-blush-deep hover:border-blush-deep focus-visible:outline-forest dark:focus-visible:outline-blush',
  secondary:
    'border border-current bg-transparent text-inherit hover:bg-blush hover:text-forest dark:hover:text-forest',
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
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {icon && iconPosition === 'left' ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? icon : null}
    </a>
  )
}
