export type ProjectLinkKind = 'github' | 'demo'

export interface ProjectLink {
  label: string
  href: string
  kind: ProjectLinkKind
}

export interface Project {
  id: string
  title: string
  context: string
  description: string
  stack: string[]
  highlights?: string[]
  links: ProjectLink[]
  featured?: boolean
}

/**
 * Edit, reorder, or add projects here. All fields are typed, and `links`
 * can stay empty when a repository or live demo is not public.
 */
export const projects: Project[] = [
  {
    id: 'urstamp',
    title: 'URStamp',
    context: 'University System',
    description:
      'An event management and QR attendance system for the University of Rizal System, designed to replace manual sign-ins with fast, verifiable check-ins.',
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Cloudflare Workers',
      'D1 (SQLite)',
      'Drizzle ORM',
    ],
    highlights: [
      'Department/program-based event audiences',
      'Encrypted QR time-in and time-out',
      'Creator-only attendance reporting with PDF export',
      'Master-list management linking student records to accounts',
    ],
    links: [],
    featured: true,
  },
  {
    id: 'automated-payroll',
    title: 'Automated Payroll System',
    context: 'Undergraduate Thesis',
    description:
      'A centralized payroll platform for the University of Rizal System, bringing HR, Accounting, employee attendance, and payroll management into one system with biometric attendance integration.',
    stack: ['React.js', 'PostgreSQL', 'Biometric Device'],
    links: [],
  },
  {
    id: 'sors',
    title: 'S.O.R.S',
    context: 'Project details to be confirmed',
    description:
      'Placeholder: add the confirmed S.O.R.S description and technology stack before publishing.',
    stack: ['Stack to be confirmed'],
    links: [],
  },
  {
    id: 'adgen',
    title: 'AdGen',
    context: 'Project details to be confirmed',
    description:
      'Placeholder: add the confirmed AdGen description and technology stack before publishing.',
    stack: ['Stack to be confirmed'],
    links: [],
  },
  {
    id: 'bytes-by-aly',
    title: 'Bytes by Aly',
    context: 'Personal Project',
    description:
      'This responsive portfolio and online resume, built with a typed content layer, system-aware dark mode, and a focus on accessibility.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    links: [],
  },
]
