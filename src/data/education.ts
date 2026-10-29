export interface EducationEntry {
  id: string
  degree: string
  program: string
  school: string
  campus: string
  location: string
  expectedGraduation: string
  description: string
  focusAreas: string[]
}

export const education: EducationEntry[] = [
  {
    id: 'bs-computer-engineering',
    degree: 'Bachelor of Science in Computer Engineering',
    program: 'BS Computer Engineering',
    school: 'University of Rizal System',
    campus: 'Antipolo Campus',
    location: 'Antipolo City, Rizal',
    expectedGraduation: 'Expected 2027',
    description:
      'A four-year program covering software development, computer systems, networking, and database design. Currently in my fourth year, with a growing focus on web development and the systems that support it.',
    focusAreas: [
      'Web Development',
      'Database Systems',
      'Software Engineering',
      'Computer Networks',
    ],
  },
]
