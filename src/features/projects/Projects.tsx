import { useReducer, useRef } from 'react'
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
  const projects = state.data.map((row) => ({
    ...presentation.find((project) => project.id === row.id),
    ...row,
    context: presentation.find((project) => project.id === row.id)?.context ?? 'Project',
    links: [
      ...(row.githubUrl ? [{ href: row.githubUrl, label: 'GitHub', kind: 'github' as const }] : []),
      ...(row.demoUrl ? [{ href: row.demoUrl, label: 'Live demo', kind: 'demo' as const }] : []),
    ],
  }))
  const visible = projects.filter((project) => showcase.filter === 'All' || categoryOf(project) === showcase.filter)
  const featured = visible.filter((project) => project.featured)
  const regular = visible.filter((project) => !project.featured)
  const selected = projects.find((project) => project.id === showcase.selectedId)
  const close = () => {
    dispatch({ type: 'close' })
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
  }
  return (
    <Section id="projects" labelledBy="projects-title" className="border-t border-forest/10 dark:border-cream/20">
      <div className="mb-6 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 lg:max-w-xl">
          <SectionHeading icon={FolderCode} id="projects-title" eyebrow="03 — Projects" title="Things I've built." />
          <p className="text-sm leading-relaxed text-sage dark:text-cream">{projects.length} projects, from thesis work to desktop apps.</p>
        </div>
        <div role="group" aria-label="Filter projects" className="flex max-w-full shrink-0 gap-2 overflow-x-auto px-1 py-2">
          {filters.map((filter) => <button key={filter} type="button" aria-pressed={showcase.filter === filter} onClick={() => dispatch({ type: 'filter', filter })} className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${showcase.filter === filter ? 'border-blush bg-blush text-forest' : 'border-forest/30 text-forest hover:bg-blush hover:text-forest dark:border-cream/40 dark:text-cream'}`}>{filter}</button>)}
        </div>
      </div>
      <p role="status" aria-live="polite" className="sr-only">{state.status === 'success' ? `${visible.length} projects shown` : ''}</p>
      {state.status === 'idle' || state.status === 'loading' ? (
        <div role="status" aria-label="Loading projects" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => <div key={index} aria-hidden="true" className={`rounded-3xl border border-cream/10 bg-forest text-cream motion-safe:animate-pulse ${index === 0 ? 'col-span-full min-h-96 p-6 md:p-8' : 'min-h-80 p-5 md:p-6'}`}><div className="mb-6 size-11 rounded-full bg-blush" /><div className="h-5 w-2/3 rounded-full bg-cream/10" /><div className="mt-4 h-24 rounded-2xl bg-cream/10" /></div>)}
        </div>
      ) : <ListStatus status={state.status} retry={state.retry} />}
      {state.status === 'success' && <div className="min-h-96" aria-label="Project showcase">
        <div key={showcase.filter} className="grid grid-cols-1 gap-4 motion-safe:transition-[transform,opacity] motion-safe:duration-200 motion-safe:starting:scale-95 motion-safe:starting:opacity-0">
          {featured.map((project) => <ProjectCard key={project.id} project={project} index={projects.findIndex((item) => item.id === project.id)} onOpen={(id, element) => { trigger.current = element; dispatch({ type: 'open', id }) }} />)}
          {regular.length > 0 && <div className="grid grid-cols-1 gap-4 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
            {regular.map((project) => <ProjectCard key={project.id} project={project} index={projects.findIndex((item) => item.id === project.id)} onOpen={(id, element) => { trigger.current = element; dispatch({ type: 'open', id }) }} />)}
          </div>}
        </div>
        {visible.length === 0 && <p className="py-6 text-sm">Nothing here yet. Check back soon.</p>}
      </div>}
      {selected && <ProjectModal project={selected} onClose={close} onStep={(direction) => {
        const index = projects.findIndex((project) => project.id === selected.id)
        const next = projects[(index + direction + projects.length) % projects.length]
        if (next) dispatch({ type: 'open', id: next.id })
      }} />}
    </Section>
  )
}
