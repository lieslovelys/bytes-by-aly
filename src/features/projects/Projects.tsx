import { projects as presentation } from '../../data/projects'
import type { projects as projectTable } from '../../worker/db/schema'
import { useApiList } from '../../hooks/useApiList'
import { ListStatus } from '../../components/ListStatus'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const state = useApiList<typeof projectTable.$inferSelect>('/api/projects')
  const projects = state.data.map((row) => ({
    ...presentation.find((project) => project.id === row.id),
    ...row,
    context: presentation.find((project) => project.id === row.id)?.context ?? 'Project',
    links: [
      ...(row.githubUrl ? [{ href: row.githubUrl, label: 'GitHub', kind: 'github' as const }] : []),
      ...(row.demoUrl ? [{ href: row.demoUrl, label: 'Live demo', kind: 'demo' as const }] : []),
    ],
  }))
  return (
    <Section
      id="projects"
      labelledBy="projects-title"
      className="border-t border-line"
    >
      <SectionHeading
        id="projects-title"
        eyebrow="03 — Projects"
        title="Things I've built."
        description="A mix of university systems and personal experiments — each one built to solve a real, specific problem."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <ListStatus status={state.status} retry={state.retry} />
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
          />
        ))}
      </div>
    </Section>
  )
}
