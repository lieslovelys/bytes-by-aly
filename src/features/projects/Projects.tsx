import { projects } from '../../data/projects'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'
import { ProjectCard } from './ProjectCard'

export function Projects() {
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
