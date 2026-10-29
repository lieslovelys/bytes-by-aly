import type { skills } from '../../worker/db/schema'
import { useApiList } from '../../hooks/useApiList'
import { ListStatus } from '../../components/ListStatus'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'
import { Tag } from '../../components/Tag'

export function Skills() {
  const state = useApiList<typeof skills.$inferSelect>('/api/skills')
  const skillGroups = Array.from(new Set(state.data.map((skill) => skill.category))).map((category, index) => ({
    id: String(index), name: category, summary: '',
    skills: state.data.filter((skill) => skill.category === category).map((skill) => skill.name),
  }))
  return (
    <Section
      id="skills"
      labelledBy="skills-title"
      className="border-t border-line"
    >
      <SectionHeading
        id="skills-title"
        eyebrow="04 — Skills"
        title="Tools I work with."
        description="The stack I reach for when turning an idea into a working interface or a dependable data flow."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <ListStatus status={state.status} retry={state.retry} />
        {skillGroups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`skill-group-${group.id}`}
            className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-7"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3
                id={`skill-group-${group.id}`}
                className="text-lg font-semibold tracking-tight"
              >
                {group.name}
              </h3>
              <span className="text-xs font-medium text-muted">
                {group.skills.length} skills
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{group.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  )
}
