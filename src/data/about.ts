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
    'To obtain an entry-level Web Developer position where I can apply my knowledge of web development, programming, and databases, and further develop my technical skills through real-world projects. I aim to contribute to a professional team by building reliable, user-friendly systems while continuously improving my problem-solving abilities and growing my career in web development.',
  facts: [
    { label: 'Based in', value: 'Antipolo City, Rizal' },
    { label: 'Degree', value: 'BS Computer Engineering' },
    { label: 'University', value: 'University of Rizal System' },
    { label: 'Expected graduation', value: '2027' },
    { label: 'Focus', value: 'Web development & databases' },
  ],
}
