import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { projects } from '../src/data/projects.ts'
import { skillGroups } from '../src/data/skills.ts'

const quote = (value: string) => `'${value.replaceAll("'", "''")}'`
// Resume-owned content tables only; contact messages are never modified.
const statements = [
   `DELETE FROM projects WHERE slug NOT IN (${projects.map((p) => quote(p.slug ?? p.id)).join(',')});`,
  `DELETE FROM skills WHERE id NOT IN (${skillGroups.flatMap((g) => g.skills.map((_, i) => quote(`${g.id}-${i}`))).join(',')});`,
]
for (const [index, project] of projects.entries()) {
  statements.push(`INSERT INTO projects (id,title,slug,description,stack,github_url,demo_url,sort_order,featured)
    VALUES (${quote(project.id)},${quote(project.title)},${quote(project.slug ?? project.id)},${quote(project.description)},${quote(JSON.stringify(project.stack))},NULL,NULL,${index},${project.featured ? 1 : 0})
    ON CONFLICT(slug) DO UPDATE SET title=excluded.title,description=excluded.description,stack=excluded.stack,github_url=NULL,demo_url=NULL,sort_order=excluded.sort_order,featured=excluded.featured;`)
}
let order = 0
for (const group of skillGroups) {
  for (const [index, name] of group.skills.entries()) {
    statements.push(`INSERT INTO skills (id,category,name,sort_order) VALUES (${quote(`${group.id}-${index}`)},${quote(group.name)},${quote(name)},${order++})
      ON CONFLICT(id) DO UPDATE SET category=excluded.category,name=excluded.name,sort_order=excluded.sort_order;`)
  }
}
mkdirSync('.wrangler', { recursive: true })
writeFileSync('.wrangler/seed.sql', statements.join('\n'))
execFileSync('pnpm', ['exec', 'wrangler', 'd1', 'execute', 'DB', '--local', '--file=.wrangler/seed.sql'], { stdio: 'inherit' })
