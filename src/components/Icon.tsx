export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-down'
  | 'check'
  | 'close'
  | 'download'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'map-pin'
  | 'menu'

interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className = 'size-4' }: IconProps) {
  const shared = {
    className,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
  } as const

  switch (name) {
    case 'github':
      return (
        <svg {...shared} fill="currentColor">
          <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.32-3.79-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15a10.6 10.6 0 0 1 5.61 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.64 5.29-5.15 5.56.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.67C23.25 5.48 18.27.5 12 .5Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...shared} fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
        </svg>
      )
    case 'mail':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        >
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      )
    case 'download':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        >
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      )
    case 'menu':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.8}
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )
    case 'close':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.8}
        >
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      )
    case 'check':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )
    case 'map-pin':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        >
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case 'arrow-down':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        >
          <path d="M12 5v14" />
          <path d="m6 13 6 6 6-6" />
        </svg>
      )
    case 'arrow-up-right':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      )
  }
}
