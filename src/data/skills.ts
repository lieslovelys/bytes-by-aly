export interface SkillGroup {
  id: string
  name: string
  summary: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    summary: 'Building responsive, accessible interfaces.',
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    name: 'Backend',
    summary: 'Connecting interfaces to data and services.',
    skills: ['Cloudflare Workers', 'Drizzle ORM', 'REST APIs'],
  },
  {
    id: 'databases',
    name: 'Databases',
    summary: 'Modeling and querying structured data.',
    skills: ['PostgreSQL', 'SQLite', 'Cloudflare D1'],
  },
  {
    id: 'tools',
    name: 'Tools',
    summary: 'Day-to-day development workflow.',
    skills: ['Git', 'GitHub', 'Vite', 'VS Code'],
  },
]
