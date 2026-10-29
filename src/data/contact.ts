export const contact = {
  github: 'https://github.com/lieslovelys',
  linkedin: 'https://www.linkedin.com/in/alyssa-mae-esponilla-96abb938a/',
  telegram: 'https://t.me/lieslovelys',
  email: 'mailto:esponillaalyssa@gmail.com',
} as const satisfies Record<'github' | 'linkedin' | 'telegram' | 'email', string>

export const contactEmail = contact.email.slice('mailto:'.length)

export const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`
