export type SocialIcon = 'github' | 'linkedin'

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
  resumeUrl: string
  socials: SocialLink[]
}

/**
 * Contact details are placeholders — update the email, GitHub, and LinkedIn
 * values below with the real accounts before publishing.
 */
export const site: SiteConfig = {
  name: 'Alyssa Mae I. Esponilla',
  shortName: 'Aly Esponilla',
  initials: 'AE',
  title: 'Computer Engineering Student | Aspiring Web Developer',
  intro:
    'Fourth-year Computer Engineering student building reliable, user-friendly web experiences.',
  email: 'alyssa.esponilla@gmail.com',
  location: 'Antipolo City, Rizal, Philippines',
  resumeUrl: '/resume.pdf',
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/alyssa-esponilla',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alyssa-esponilla',
      icon: 'linkedin',
    },
  ],
}
