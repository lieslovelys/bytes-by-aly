import { contact, contactEmail } from './contact'

export type SocialIcon = 'github' | 'linkedin' | 'telegram'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export interface SiteConfig {
  name: string
  shortName: string
  initials: string
  title: string
  intro: string
  email: string
  location: string
  socials: SocialLink[]
}

export const site: SiteConfig = {
  name: 'Alyssa Mae I. Esponilla',
  shortName: 'Alyssa Mae I. Esponilla',
  initials: 'AE',
  title: 'Computer Engineering Student | Entry-level Web Developer',
  intro:
    'Bachelor of Science in Computer Engineering · Expected Graduation: 2027',
  email: contactEmail,
  location: 'Angono, Rizal, Philippines',
  socials: [
    {
      label: 'GitHub',
      href: contact.github,
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: contact.linkedin,
      icon: 'linkedin',
    },
    {
      label: 'Telegram',
      href: contact.telegram,
      icon: 'telegram',
    },
  ],
}
