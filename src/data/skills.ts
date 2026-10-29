export interface SkillGroup { id: string; name: string; skills: string[] }
export const skillGroups: SkillGroup[] = [
  { id: 'languages-web-tools', name: 'Languages & Web Tools', skills: ['JavaScript', 'HTML', 'CSS', 'C++', 'Python', 'VB.NET', 'React.js', 'Node.js', 'Tailwind CSS'] },
  { id: 'platforms-databases', name: 'Platforms & Databases', skills: ['GitHub', 'Vercel', 'Figma', 'Jira', 'MySQL', 'PostgreSQL', 'Firebase'] },
  { id: 'core-competencies', name: 'Core Competencies', skills: ['Front-End Development', 'Project Management', 'API Integration', 'Real-Time Systems', 'UI/UX Wireframing'] },
  { id: 'ai-development-tools', name: 'AI & Development Tools', skills: ['AI-Assisted Coding', 'Prompt Writing', 'AI-Assisted Debugging', 'AI-Assisted Research'] },
]
