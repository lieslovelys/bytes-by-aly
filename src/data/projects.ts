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
  award?: string
  links: ProjectLink[]
  imageUrl?: string | null
  images?: string[]
  loginImage?: string
  signupImage?: string
  featured?: boolean
  year?: number
}
export const projects: Project[] = [
  {
    id: 'automated-payroll',
    slug: 'automated-payroll',
    year: 2026,
    title: 'Automated Payroll System for the University of Rizal System — Thesis Project',
    context: 'Thesis Project',
    description: 'Developed a centralized payroll system integrating HR, Accounting, employee attendance, and payroll management, with biometric attendance integration for automated employee time recording.',
    stack: ['React.js', 'PostgreSQL', 'Biometric Device'],
    links: [
      {
        href: 'https://urs-payroll-system.onrender.com/login',
        label: 'View site',
        kind: 'demo',
      },
    ],
    featured: true,
    imageUrl: '/images/projects/payroll-login.png',
    loginImage: '/images/projects/payroll-login.png',
    images: [
      '/images/projects/payroll-login.png',
      '/images/projects/payroll-dashboard.png',
      '/images/projects/payroll-payslips.png',
      '/images/projects/payroll-logout.png',
    ],
  },
  {
    id: 'urstamp',
    year: 2026,
    title: 'URStamp: Event Management and QR Attendance System for the University of Rizal System',
    context: 'Project',
    description: 'Developed a centralized event platform integrating department and program-based event audiences, encrypted QR time-in/time-out scanning, and creator-only attendance reporting with PDF export, plus master-list management that links student records to registered accounts.',
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Cloudflare Workers', 'D1 (SQLite)', 'Drizzle ORM'],
    links: [
      {
        href: 'https://urstamp-prod.cruzjack689.workers.dev/login',
        label: 'View site',
        kind: 'demo',
      },
    ],
    imageUrl: '/images/projects/urstamp-login.png',
    loginImage: '/images/projects/urstamp-login.png',
    signupImage: '/images/projects/urstamp-register.png',
    images: [
      '/images/projects/urstamp-login.png',
      '/images/projects/urstamp-register.png',
      '/images/projects/urstamp.png',
      '/images/projects/urstamp-events.png',
      '/images/projects/urstamp-masterlist.png',
      '/images/projects/urstamp-profile.png',
    ],
  },
  {
    id: 'dao-for-clubs',
    slug: 'dao-for-clubs',
    title: 'DAO for Clubs',
    context: 'Hackathon Finalist',
    year: 2026,
    description: 'Decentralized organization and event funding platform on BNB Smart Chain, empowering student clubs to discover funding pools, author markdown proposals, and execute on-chain governance without requiring initial wallet connection.',
    award: 'Top 10 Finalist – BCC x Binance Academy: Build4Campus Hackathon',
    stack: ['Solidity', 'BNB Smart Chain', 'React.js', 'TypeScript', 'Web3 / IPFS', 'Tailwind CSS'],
    highlights: [
      'Selected as one of 10 finalists out of nationwide university entries in the BCC x Binance Academy: Build4Campus Hackathon, pitching and defending on-site at the University of Makati.',
      'Engineered an on-chain DAO governance and treasury funding flow on BNB Smart Chain with immutable document references pinned to IPFS.',
      'Designed a frictionless onboarding UX allowing students and organizers to explore treasuries and draft proposals without requiring wallet connection until on-chain submission.',
    ],
    links: [
      {
        href: 'https://blockhub.academy/attendance-certificates/BLKC-Y6WH-UZJN-NFED',
        label: 'View certificate',
        kind: 'demo',
      },
    ],
    imageUrl: '/images/projects/dao-for-clubs-home.png',
    loginImage: '/images/projects/dao-for-clubs-home.png',
    images: [
      '/images/projects/dao-for-clubs-home.png',
      '/images/projects/dao-for-clubs-treasury.png',
      '/images/projects/dao-for-clubs-draft.png',
      '/images/projects/dao-for-clubs-proposal.png',
      '/images/projects/dao-for-clubs-ipfs.png',
      '/images/projects/dao-for-clubs-create.png',
      '/images/projects/dao-for-clubs-created.png',
      '/images/projects/dao-for-clubs-events.png',
    ],
  },
  {
    id: 'sors',
    slug: 'sors',
    title: 'URS S.O.R.S (Student Online Resource Site)',
    context: 'Project',
    year: 2024,
    description: 'Directed development of a real-time academic hub for Computer Engineering students with role-based access, featuring dynamic file-sharing interfaces for instant professor uploads (PDFs, videos) without page refreshes, plus live front-end tools including the Merriam-Webster API, World Clock, and an AI study assistant chatbot.',
    stack: ['PHP', 'HTML', 'MySQL'],
    links: [
      {
        href: 'https://ursors.pages.dev/home',
        label: 'View site',
        kind: 'demo',
      },
    ],
    imageUrl: '/images/projects/sors-landing.png',
    loginImage: '/images/projects/sors-login.png',
    signupImage: '/images/projects/sors-register.png',
    images: [
      '/images/projects/sors-landing.png',
      '/images/projects/sors-login.png',
      '/images/projects/sors-register.png',
      '/images/projects/sors-admin.png',
      '/images/projects/sors-accounts.png',
      '/images/projects/sors-notifications.png',
      '/images/projects/sors-profile.png',
      '/images/projects/sors-subjects.png',
      '/images/projects/sors-logout.png',
    ],
  },
  {
    id: 'adgen', title: 'AdGen – AI Instant Video Ad Generator', context: 'Project',
    year: 2025,
    description: 'Developed an AI-powered 10-second commercial script generator with interactive user forms for submitting brand logos, product details, and ad scenarios to streamline content creation.',
    stack: ['Node.js', 'Firebase'], links: [],
  },
  {
    id: 'edupro', title: 'EduPro — Online DSA Library', context: 'Project',
    year: 2024,
    description: 'Built a web-based learning library that organizes Data Structures and Algorithms resources, giving students a searchable, easy-to-navigate collection of digital books in one place.',
    stack: ['PHP', 'HTML', 'MySQL'], links: [],
    imageUrl: '/images/projects/edupros.png',
    loginImage: '/images/projects/login.png',
    signupImage: '/images/projects/signup.png',
  },
  {
    id: 'wooden-bizarre',
    slug: 'wooden-bizarre',
    title: 'The Wooden Bizarre Management System',
    context: 'Project',
    year: 2026,
    description: 'Developed a business management system for managing orders, employees, attendance, and related business records.',
    stack: ['React.js', 'PostgreSQL'],
    links: [
      {
        href: 'https://woodenbizarre.tech/login',
        label: 'View site',
        kind: 'demo',
      },
    ],
    imageUrl: '/images/projects/wooden-bizarre-login.png',
    loginImage: '/images/projects/wooden-bizarre-login.png',
    images: [
      '/images/projects/wooden-bizarre-login.png',
    ],
  },
  {
    id: 'dunkin-donuts-ordering-system', slug: 'dunkin-donuts-ordering-system',
    year: 2023,
    title: 'Dunkin Donuts Ordering System', context: 'Project',
    description: 'Developed a desktop ordering system for a Dunkin Donuts-style store that handles menu items, customer orders, and transactions.',
    stack: ['VB.NET', 'MySQL'], links: [],
  },
  {
    id: 'certfolio',
    slug: 'certfolio',
    title: 'CertFolio (Verifold)',
    context: 'Project',
    year: 2026,
    description: 'Free, fast, edge-hosted certificate portfolio web app where anyone can sign up, upload their credentials (PDF / Images), and share a single verified public link on their resume or LinkedIn.',
    stack: ['Cloudflare Workers', 'Hono', 'D1 (SQLite)', 'Drizzle ORM', 'Cloudflare R2', 'Tailwind CSS', 'TypeScript'],
    highlights: [
      'Engineered an edge-native multi-tenant portfolio platform using Cloudflare Workers, Hono, D1 (SQLite), and R2, reducing global Time to First Byte (TTFB) to under 30ms while operating completely within Cloudflare’s free tier.',
      'Implemented passwordless cryptographic edge authentication utilizing the Web Crypto API (SHA-256 token hashing) and secure session cookies, eliminating external auth latency and cold-start overhead.',
      'Architected multi-tenant file security and magic-byte validation, enforcing server-side content-type inspection for PDFs and images, ownership isolation, and differential edge cache headers for public vs. private credentials.',
    ],
    links: [
      {
        href: 'https://verifold-bm7.pages.dev/',
        label: 'View site',
        kind: 'demo',
      },
    ],
    imageUrl: '/images/projects/certfolio-landing.png',
    loginImage: '/images/projects/certfolio-landing.png',
    images: [
      '/images/projects/certfolio-landing.png',
      '/images/projects/certfolio-features.png',
      '/images/projects/certfolio-speed.png',
      '/images/projects/certfolio-profile.png',
      '/images/projects/certfolio-grid.png',
    ],
  },
]
