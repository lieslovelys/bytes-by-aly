export interface AboutFact {
  label: string
  value: string
}

export interface AboutContent {
  objective: string
  facts: AboutFact[]
}

export const about: AboutContent = {
  objective:
    'To join a collaborative development team as an entry-level Web Developer, where I can apply my background in programming and databases to create practical, high-quality web solutions. I am committed to continuous learning, sharpening my problem-solving skills, and delivering work that meets the needs of users and the organization.',
  facts: [
    { label: 'Based in', value: 'Angono, Rizal, Philippines' },
    { label: 'Degree', value: 'BS Computer Engineering' },
    { label: 'University', value: 'University of Rizal System' },
    { label: 'Expected graduation', value: '2027' },
    { label: 'Focus', value: 'Web development & databases' },
  ],
}
