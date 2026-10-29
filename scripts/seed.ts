import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { projects } from '../src/data/projects.ts'
import { skillGroups } from '../src/data/skills.ts'

const args = process.argv.slice(2)
if (args.some((arg) => arg !== '--remote')) throw new Error('Usage: seed.ts [--remote]')
const remote = args.includes('--remote')
const quote = (value: string) => `'${value.replaceAll("'", "''")}'`
// Resume-owned content tables only; contact messages are never modified.
// Remote seeding only fills missing rows: never delete or update production content.
const statements = remote ? [] : [
   `DELETE FROM projects WHERE slug NOT IN (${projects.map((p) => quote(p.slug ?? p.id)).join(',')});`,
  `DELETE FROM skills WHERE id NOT IN (${skillGroups.flatMap((g) => g.skills.map((_, i) => quote(`${g.id}-${i}`))).join(',')});`,
]
for (const [index, project] of projects.entries()) {
  statements.push(`INSERT INTO projects (id,title,slug,description,stack,github_url,demo_url,sort_order,featured)
    VALUES (${quote(project.id)},${quote(project.title)},${quote(project.slug ?? project.id)},${quote(project.description)},${quote(JSON.stringify(project.stack))},NULL,NULL,${index},${project.featured ? 1 : 0})
    ${remote ? 'ON CONFLICT DO NOTHING' : 'ON CONFLICT(slug) DO UPDATE SET title=excluded.title,description=excluded.description,stack=excluded.stack,github_url=NULL,demo_url=NULL,sort_order=excluded.sort_order,featured=excluded.featured'};`)
}
let order = 0
for (const group of skillGroups) {
  for (const [index, name] of group.skills.entries()) {
    statements.push(`INSERT INTO skills (id,category,name,sort_order) VALUES (${quote(`${group.id}-${index}`)},${quote(group.name)},${quote(name)},${order++})
      ${remote ? 'ON CONFLICT DO NOTHING' : 'ON CONFLICT(id) DO UPDATE SET category=excluded.category,name=excluded.name,sort_order=excluded.sort_order'};`)
  }
}
mkdirSync('.wrangler', { recursive: true })
const file = `.wrangler/seed${remote ? '-remote' : ''}.sql`
writeFileSync(file, statements.join('\n'))
execFileSync('pnpm', ['exec', 'wrangler', 'd1', 'execute', 'DB', remote ? '--remote' : '--local', `--file=${file}`], { stdio: 'inherit' })
