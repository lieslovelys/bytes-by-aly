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
      className="border-t border-forest/10 bg-blush/20 dark:border-cream/20 dark:bg-forest-dark"
    >
      <SectionHeading
        icon={Wrench}
        id="skills-title"
        eyebrow="04 — Skills"
        title="Tools I work with."
        subtitle="The stack I reach for when turning an idea into a working interface or a dependable data flow."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ListStatus status={state.status} retry={state.retry} />
        {skillGroups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`skill-group-${group.id}`}
            className="rounded-3xl border border-forest/10 bg-cream p-5 shadow-sm dark:border-cream/20 dark:bg-forest md:p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3
                id={`skill-group-${group.id}`}
                className="text-base leading-tight font-semibold tracking-tight text-balance"
              >
                {group.name}
              </h3>
              <span className="text-xs font-medium text-sage dark:text-cream">
                {group.skills.length} skills
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-sage dark:text-cream">{group.summary}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
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
import { Wrench } from 'lucide-react'
