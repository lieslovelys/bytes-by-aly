import type { Project } from '../../data/projects'
import { academicAchievement } from '../../data/achievements'
import { Tag } from '../../components/Tag'
import { iconOf, slugOf, titleOf } from './showcase'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (id: string, trigger: HTMLElement) => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const featured = project.featured === true
  const ProjectIcon = iconOf(project)
  const award = slugOf(project) === 'urstamp' ? academicAchievement.match(/System Making (1st place) – URStamp \((\d+)\)/) : null
  const title = featured ? titleOf(project).split(' for ')[0] : titleOf(project)
  return (
    <article
      data-index={index}
      className={`group relative flex min-w-0 flex-col rounded-3xl border border-cream/10 bg-forest text-cream shadow-sm transition-colors duration-200 hover:border-blush focus-within:border-blush motion-safe:transition-[transform,opacity,border-color]! motion-safe:duration-200! motion-safe:hover:delay-0! motion-safe:focus-within:delay-0! motion-safe:hover:-translate-y-1 ${featured ? 'col-span-full' : ''}`}
    >
      <div className="flex h-full flex-1 flex-col rounded-3xl">
        <div className="flex h-full flex-1 flex-col rounded-3xl p-5 md:p-6">
          <div className={featured ? 'mb-3 flex items-center gap-3' : 'mb-4 flex items-start justify-between gap-3'}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blush text-forest motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:rotate-6">
              <ProjectIcon aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </span>
            {featured && <p className="w-fit rounded-full bg-blush px-3 py-1 text-label font-semibold tracking-widest text-forest">THESIS PROJECT</p>}
            <span className={`${featured ? 'ml-auto ' : ''}text-xs tabular-nums`}>{String(index + 1).padStart(2, '0')}</span>
          </div>
          {award && <p className="mb-3 w-fit rounded-full bg-blush px-2.5 py-0.5 text-xs font-semibold text-forest">{award[1]} · System Making {award[2]}</p>}
          <h3 className={`font-semibold text-balance ${featured ? 'mb-3 max-w-3xl font-heading text-xl leading-tight md:text-2xl' : 'line-clamp-2 text-lg leading-tight'}`}>
            <button type="button" onClick={(event) => onOpen(project.id, event.currentTarget)} className="min-h-11 text-left ring-blush ring-offset-2 ring-offset-forest-dark after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:after:ring-2 focus-visible:after:ring-blush focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-forest-dark">
               {title}
                {featured && <>{' '}{titleOf(project).slice(title.length).trim()}</>}
            </button>
          </h3>
          <p className={`text-sm leading-relaxed ${featured ? 'mb-4 max-w-3xl md:text-base' : 'mt-3 line-clamp-3'}`}>{project.description}</p>
          {featured ? <div className="w-full border-t border-cream/15">
            <div className="flex flex-col items-start gap-3 pt-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
              <ul aria-label={`${title} technology stack`} className="flex min-w-0 flex-wrap gap-1.5">
                {project.stack.map((technology) => <li key={technology}><Tag>{technology}</Tag></li>)}
              </ul>
              <button type="button" onClick={(event) => onOpen(project.id, event.currentTarget)} className="relative z-10 min-h-11 shrink-0 rounded-full border border-cream px-4 py-2 text-sm font-semibold ring-blush ring-offset-2 ring-offset-forest-dark hover:bg-blush hover:text-forest focus-visible:outline-none focus-visible:ring-2">View details</button>
            </div>
          </div> : <div className="mt-auto pt-4">
            <div className="mb-4 border-t border-current opacity-15" />
            <ul aria-label={`${title} technology stack`} className="flex flex-wrap gap-1.5">
              {project.stack.map((technology) => <li key={technology}><Tag>{technology}</Tag></li>)}
            </ul>
          </div>}
        </div>
      </div>
    </article>
  )
}
