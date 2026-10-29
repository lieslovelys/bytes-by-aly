import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { projects } from '../src/data/projects.ts'

const quote = (value: string) => `'${value.replaceAll("'", "''")}'`
const statements = projects.map((project, index) => {
  const title = project.id === 'automated-payroll' ? 'Automated Payroll System for URS' : project.title
  const stack = project.stack.map((item) => item === 'D1 (SQLite)' ? 'D1' : item)
  return `INSERT INTO projects (id,title,slug,description,stack,github_url,demo_url,sort_order)
    VALUES (${quote(project.id)},${quote(title)},${quote(project.id)},${quote(project.description)},${quote(JSON.stringify(stack))},NULL,NULL,${index}) ON CONFLICT DO NOTHING;`
})
const groups = {
  Frontend: ['React', 'TypeScript', 'Tailwind CSS'],
  Databases: ['PostgreSQL', 'SQLite', 'D1'],
  'Tools & Cloud': ['Git/GitHub', 'Cloudflare Workers'],
}
let order = 0
for (const [category, names] of Object.entries(groups)) {
  for (const name of names) {
    statements.push(`INSERT INTO skills (id,category,name,sort_order) VALUES (${quote(name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'))},${quote(category)},${quote(name)},${order++}) ON CONFLICT DO NOTHING;`)
  }
}
mkdirSync('.wrangler', { recursive: true })
writeFileSync('.wrangler/seed.sql', statements.join('\n'))
execFileSync('pnpm', ['exec', 'wrangler', 'd1', 'execute', 'DB', '--local', '--file=.wrangler/seed.sql'], { stdio: 'inherit' })
