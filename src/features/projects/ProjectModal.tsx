import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Project } from '../../data/projects'
import { Tag } from '../../components/Tag'
import { iconOf, titleOf } from './showcase'

interface ProjectModalProps {
  project: Project
  onClose: () => void
  onStep: (direction: number) => void
}

export function ProjectModal({ project, onClose, onStep }: ProjectModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const ProjectIcon = iconOf(project)
  useEffect(() => {
    const element = dialog.current!
    const previous = document.activeElement
    const locked = document.body.classList.contains('overflow-hidden')
    // Native modal dialogs provide top-layer isolation and focus containment.
    element.showModal()
    document.body.classList.add('overflow-hidden')
    return () => {
      element.close()
      if (!locked) document.body.classList.remove('overflow-hidden')
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true })
    }
  }, [])
  return (
    <dialog ref={dialog} aria-modal="true" aria-labelledby="project-modal-title" onKeyDown={(event) => {
      if (event.key !== 'Tab') return
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'))
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }} onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }} className="fixed inset-0 m-auto max-h-[85svh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-forest/20 bg-cream p-0 text-forest shadow-xl backdrop:bg-forest/70 motion-safe:animate-fade-up dark:border-cream/20 dark:bg-forest-dark dark:text-cream">
      <div className="p-5 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-16 place-items-center rounded-full bg-blush text-forest"><ProjectIcon aria-hidden="true" className="size-8" strokeWidth={1.5} /></span>
          <button type="button" autoFocus aria-label="Close project details" onClick={onClose} className="grid size-11 place-items-center rounded-full border border-current"><X aria-hidden="true" className="size-5" /></button>
        </div>
        <div key={project.id} className="motion-safe:animate-label-enter">
          <h2 id="project-modal-title" className="mt-5 text-2xl leading-tight font-semibold text-balance">{titleOf(project)}</h2>
          <p className="mt-4 text-sm leading-relaxed">{project.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">{project.stack.map((tag) => <li key={tag}><Tag>{tag}</Tag></li>)}</ul>
          {project.links.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-blush px-4 py-2 text-sm font-semibold text-forest">{link.label}<span className="sr-only"> (opens in a new tab)</span></a>)}</div>}
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-current/20 pt-4">
          <button type="button" onClick={() => onStep(-1)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current px-4 text-sm"><ChevronLeft aria-hidden="true" className="size-4" />Previous project</button>
          <button type="button" onClick={() => onStep(1)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current px-4 text-sm">Next project<ChevronRight aria-hidden="true" className="size-4" /></button>
        </div>
      </div>
    </dialog>
  )
}
