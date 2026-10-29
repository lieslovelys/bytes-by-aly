export interface HeroFact {
  label: string
  value: string
}

export interface HeroContent {
  greeting: string
  availability: string
  facts: HeroFact[]
  currently: string
}

export const hero: HeroContent = {
  greeting: "Hello, I'm",
  availability: 'Open to entry-level Web Developer roles',
  facts: [
    { label: 'Based in', value: 'Antipolo City, Rizal' },
    { label: 'Program', value: 'BS Computer Engineering' },
    { label: 'Campus', value: 'URS Antipolo' },
    { label: 'Graduating', value: '2027' },
  ],
  currently: 'Building URStamp, a QR-based attendance system for URS.',
}
