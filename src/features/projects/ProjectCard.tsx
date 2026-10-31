import { createElement } from 'react'
import { ArrowUpRight, Award } from 'lucide-react'
import type { Project } from '../../data/projects'
import { academicAchievement } from '../../data/achievements'
import { categoryOf, iconOf, slugOf, titleOf, yearOf } from './showcase'

interface ProjectCardProps { project: Project; index: number; onOpen: (id: string, trigger: HTMLElement) => void }
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const featured = project.featured === true
  const year = yearOf(project)
  return <li className={`bento-item ${featured ? 'bento-featured' : ''}`}>
    <article className="bento-card">
      <div className="code-header" aria-hidden="true"><span className="window-controls"><span /><span /><span /></span><span className="code-filename">{slugOf(project)}.tsx</span></div>
      <div className="bento-body">
        {featured && <span className="project-decoration" aria-hidden="true" />}
        <div className="project-summary">
        <div className="project-meta"><span className="soft-icon">{createElement(iconOf(project), { 'aria-hidden': true, className: 'size-5', strokeWidth: 1.5 })}</span><span className="meta-pill project-meta-pill">{featured ? 'Thesis · Featured' : categoryOf(project) ?? project.context}{year !== undefined && <><span aria-hidden="true"> · </span><time dateTime={String(year)} className="project-year">{year}</time></>}</span></div>
        <h3 className="bento-title"><button type="button" aria-haspopup="dialog" aria-describedby={`project-summary-${index}`} onClick={(event) => onOpen(project.id, event.currentTarget)} className="project-trigger"><span className={featured ? '' : 'line-clamp-2'}>{titleOf(project)}</span></button></h3>
        {slugOf(project) === 'urstamp' && <p className="project-award"><Award aria-hidden="true" className="size-3.5 shrink-0" />{academicAchievement}</p>}
        <p id={`project-summary-${index}`} className={`${featured ? 'featured-description' : 'line-clamp-3'} text-sm leading-relaxed text-muted`}>{project.description}</p>
        </div>
        <div className="project-footer">
        <ul className="project-stack" aria-label="Technology stack">{project.stack.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}{project.stack.length > 4 && <li aria-label={`${project.stack.length - 4} more technologies in details`}>+{project.stack.length - 4}</li>}</ul>
        <span className="project-details" aria-hidden="true">View details <ArrowUpRight className="size-4" /></span>
        </div>
      </div>
    </article>
  </li>
}
