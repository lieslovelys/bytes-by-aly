export type ProjectLinkKind = 'github' | 'demo'
export interface ProjectLink { label: string; href: string; kind: ProjectLinkKind }
export interface Project {
  id: string
  slug?: string
  title: string
  context: string
  description: string
  stack: string[]
  highlights?: string[]
  links: ProjectLink[]
  featured?: boolean
}
export const projects: Project[] = [
  {
    id: 'automated-payroll',
    title: 'Automated Payroll System for the University of Rizal System — Thesis Project',
    context: 'Thesis Project',
    description: 'Developed a centralized payroll system integrating HR, Accounting, employee attendance, and payroll management, with biometric attendance integration for automated employee time recording.',
    stack: ['React.js', 'PostgreSQL', 'Biometric Device'], links: [], featured: true,
  },
  {
    id: 'urstamp',
    title: 'URStamp: Event Management and QR Attendance System for the University of Rizal System',
    context: 'Project',
    description: 'Developed a centralized event platform integrating department and program-based event audiences, encrypted QR time-in/time-out scanning, and creator-only attendance reporting with PDF export, plus master-list management that links student records to registered accounts.',
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Cloudflare Workers', 'D1 (SQLite)', 'Drizzle ORM'], links: [],
  },
  {
    id: 'sors', title: 'URS S.O.R.S (Student Online Resource Site)', context: 'Project',
    description: 'Directed development of a real-time academic hub for Computer Engineering students with role-based access, featuring dynamic file-sharing interfaces for instant professor uploads (PDFs, videos) without page refreshes, plus live front-end tools including the Merriam-Webster API, World Clock, and an AI study assistant chatbot.',
    stack: ['PHP', 'HTML', 'MySQL'], links: [],
  },
  {
    id: 'adgen', title: 'AdGen – AI Instant Video Ad Generator', context: 'Project',
    description: 'Developed an AI-powered 10-second commercial script generator with interactive user forms for submitting brand logos, product details, and ad scenarios to streamline content creation.',
    stack: ['Node.js', 'Firebase'], links: [],
  },
  {
    id: 'edupro', title: 'EduPro — Online DSA Library', context: 'Project',
    description: 'Built a web-based learning library that organizes Data Structures and Algorithms resources, giving students a searchable, easy-to-navigate collection of digital books in one place.',
    stack: ['PHP', 'HTML', 'MySQL'], links: [],
  },
  {
    id: 'wooden-bizarre', title: 'Wooden Bizarre Management System', context: 'Project',
    description: 'Developed a business management system for managing orders, employees, attendance, and related business records.',
    stack: ['React.js', 'PostgreSQL'], links: [],
  },
  {
    id: 'dunkin-donuts-ordering-system', slug: 'dunkin-donuts-ordering-system',
    title: 'Dunkin Donuts Ordering System', context: 'Project',
    description: 'Developed a desktop ordering system for a Dunkin Donuts-style store that handles menu items, customer orders, and transactions.',
    stack: ['VB.NET', 'MySQL'], links: [],
  },
]
