import type { Project } from '../../data/projects'
import { Icon } from '../../components/Icon'
import { Tag } from '../../components/Tag'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { featured = false, highlights = [] } = project

  return (
    <article
      className={`flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md focus-within:border-accent/60 motion-reduce:hover:translate-y-0 sm:p-7 ${
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div
        className={
          featured
            ? 'grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12'
            : 'flex flex-1 flex-col'
        }
      >
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {project.context}
            </p>
            <span
              aria-hidden="true"
              className="text-xs font-semibold text-muted/70 tabular-nums"
            >
              {String(index).padStart(2, '0')}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {project.title}
            </h3>
            {featured ? (
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-accent uppercase">
                Featured
              </span>
            ) : null}
          </div>

          <p className="mt-3 text-sm leading-6 text-muted">
            {project.description}
          </p>

          <ul
            aria-label={`${project.title} technology stack`}
            className="mt-5 flex flex-wrap gap-1.5"
          >
            {project.stack.map((technology) => (
              <li key={technology}>
                <Tag>{technology}</Tag>
              </li>
            ))}
          </ul>

          {project.links.length > 0 ? (
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent/50 hover:bg-accent-soft hover:text-accent"
                >
                  {link.label}
                  <Icon
                    name={link.kind === 'github' ? 'github' : 'arrow-up-right'}
                    className="size-3.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {featured && highlights.length > 0 ? (
          <div className="rounded-2xl bg-surface-muted p-5 sm:p-6">
            <h4 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              Highlights
            </h4>
            <ul className="mt-3.5 space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 text-sm leading-6 text-ink"
                >
                  <Icon
                    name="check"
                    className="mt-1 size-3.5 shrink-0 text-accent"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  )
}
