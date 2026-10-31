import { useReducer, useRef } from 'react'
import { flushSync } from 'react-dom'
import { FolderCode } from 'lucide-react'
import { projects as presentation } from '../../data/projects'
import type { projects as projectTable } from '../../worker/db/schema'
import { useApiList } from '../../hooks/useApiList'
import { ListStatus } from '../../components/ListStatus'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { categoryOf, filters, showcaseReducer } from './showcase'

export function Projects() {
  const state = useApiList<typeof projectTable.$inferSelect>('/api/projects')
  const [showcase, dispatch] = useReducer(showcaseReducer, { filter: 'All', selectedId: null })
  const trigger = useRef<HTMLElement | null>(null)
  const changeFilter = (filter: typeof showcase.filter) => {
    if (filter === showcase.filter) return
    const update = () => { flushSync(() => dispatch({ type: 'filter', filter })) }
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(update)
    } else update()
  }
  const projects = state.data.map((row) => ({
    ...presentation.find((project) => project.id === row.id),
    ...row,
    year: presentation.find((project) => project.id === row.id || (project.slug ?? project.id) === row.slug || project.title === row.title)?.year,
    context: presentation.find((project) => project.id === row.id)?.context ?? 'Project',
    links: [
      ...(row.githubUrl ? [{ href: row.githubUrl, label: 'GitHub', kind: 'github' as const }] : []),
      ...(row.demoUrl ? [{ href: row.demoUrl, label: 'Live demo', kind: 'demo' as const }] : []),
    ],
  }))
  const visible = projects.filter((project) => showcase.filter === 'All' || categoryOf(project) === showcase.filter).sort((a, b) => Number(b.featured === true) - Number(a.featured === true))
  const selected = projects.find((project) => project.id === showcase.selectedId)
  const close = () => {
    dispatch({ type: 'close' })
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
  }
  return (
    <Section id="projects" labelledBy="projects-title">
      <div className="mb-6 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 lg:max-w-xl">
          <SectionHeading icon={FolderCode} id="projects-title" eyebrow="03 — Selected projects" title="My works" />
          <p className="text-sm leading-relaxed text-muted">{state.status === 'success' ? `${projects.length} projects, from thesis work to desktop apps.` : 'From thesis work to desktop apps.'}</p>
        </div>
        <div role="group" aria-label="Filter projects" className="flex max-w-full flex-wrap gap-2 py-2">
          {filters.map((filter) => <button key={filter} type="button" aria-pressed={showcase.filter === filter} onClick={() => changeFilter(filter)} className={`project-filter min-h-11 rounded-lg border px-4 py-2 text-sm font-medium ${showcase.filter === filter ? 'border-accent bg-accent text-on-accent' : 'border-line text-muted'}`}>{filter}</button>)}
        </div>
      </div>
      <p role="status" aria-live="polite" className="sr-only">{state.status === 'success' ? `${visible.length} projects shown` : ''}</p>
      {state.status === 'idle' || state.status === 'loading' ? (
        <div role="status" aria-label="Loading projects">
          <ul className="bento-grid">{[0, 1, 2, 3, 4, 5, 6].map((index) => <li key={index} aria-hidden="true" className={`bento-skeleton ${index === 0 ? 'bento-featured' : ''}`}><div className="h-5 w-2/3 rounded bg-tint" /><div className="mt-4 h-24 rounded-xl bg-tint" /></li>)}</ul>
        </div>
      ) : <ListStatus status={state.status} retry={state.retry} />}
      {state.status === 'success' && <div aria-label="Project showcase">
        <ul key={showcase.filter} className="bento-grid">
          {visible.map((project) => <ProjectCard key={project.id} project={project} index={projects.findIndex((item) => item.id === project.id)} onOpen={(id, element) => { trigger.current = element; dispatch({ type: 'open', id }) }} />)}
        </ul>
        {visible.length === 0 && <p className="py-6 text-sm">Nothing here yet. Check back soon.</p>}
      </div>}
      {selected && <ProjectModal project={selected} projectIndex={projects.findIndex((project) => project.id === selected.id)} projectCount={projects.length} onClose={close} onStep={(direction) => {
        const index = projects.findIndex((project) => project.id === selected.id)
        const next = projects[(index + direction + projects.length) % projects.length]
        if (next) dispatch({ type: 'open', id: next.id })
      }} />}
    </Section>
  )
}
