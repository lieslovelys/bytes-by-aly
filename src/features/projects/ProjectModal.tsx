import { createElement, useEffect, useLayoutEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Project } from '../../data/projects'
import { Tag } from '../../components/Tag'
import { iconOf, slugOf, titleOf, yearOf } from './showcase'

interface ProjectModalProps {
  project: Project
  projectIndex: number
  projectCount: number
  onClose: () => void
  onStep: (direction: number) => void
}

export function ProjectModal({ project, projectIndex, projectCount, onClose, onStep }: ProjectModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const closing = useRef(false)
  const requestClose = () => {
    if (closing.current) return
    closing.current = true
    const element = dialog.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onClose(); return }
    element.setAttribute('data-closing', 'true')
    const animations = element.getAnimations({ subtree: true })
    void Promise.allSettled(animations.map((animation) => animation.finished)).then(onClose)
  }
  const year = yearOf(project)
  useLayoutEffect(() => {
    if (body.current) body.current.scrollTop = 0
  }, [project.id])
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
      if (!event.altKey && !event.ctrlKey && !event.metaKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault()
        onStep(event.key === 'ArrowLeft' ? -1 : 1)
        return
      }
      if (event.key !== 'Tab') return
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'))
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }} onCancel={(event) => { event.preventDefault(); requestClose() }} onClick={(event) => { if (event.target === event.currentTarget) requestClose() }} className="project-dialog fixed inset-0 m-auto rounded-2xl p-0 shadow-xl">
      <div className="code-header" aria-hidden="true"><span className="window-controls"><span /><span /><span /></span><span className="code-filename">{slugOf(project)}.tsx</span></div>
      <div ref={body} className="project-dialog-body">
        <div className="project-dialog-toolbar flex items-start justify-between gap-4">
          <span className="grid size-14 place-items-center rounded-xl bg-tint text-accent">{createElement(iconOf(project), { 'aria-hidden': true, className: 'size-6', strokeWidth: 1.5 })}</span>
          <button type="button" autoFocus aria-label="Close project details" onClick={requestClose} className="modal-close grid size-11 place-items-center rounded-lg border border-line"><X aria-hidden="true" className="size-5" /></button>
        </div>
        <div key={project.id} className="project-dialog-content">
          <p className="eyebrow">Project details{year !== undefined && <> · <time dateTime={String(year)} className="project-year">{year}</time></>}</p>
          <h2 id="project-modal-title" className="text-3xl leading-tight font-semibold text-balance md:text-4xl">{titleOf(project)}</h2>
          <p className="text-sm leading-7 text-muted">{project.description}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Technology stack">{project.stack.map((tag) => <li key={tag}><Tag>{tag}</Tag></li>)}</ul>
          {project.links.length > 0 && <div className="flex flex-wrap gap-2">{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="button">{link.label}<span className="sr-only"> (opens in a new tab)</span></a>)}</div>}
        </div>
      </div>
      <div className="project-dialog-footer" role="group" aria-label="Project navigation">
        <button type="button" aria-label="Previous project" onClick={() => onStep(-1)} className="button button-secondary"><ChevronLeft aria-hidden="true" className="size-4" /><span className="sm:hidden">Prev</span><span className="hidden sm:inline">Previous project</span></button>
        <span className="project-dialog-counter" role="status" aria-live="polite" aria-label={`Project ${projectIndex + 1} of ${projectCount}`}>{projectIndex + 1} / {projectCount}</span>
        <button type="button" aria-label="Next project" onClick={() => onStep(1)} className="button button-secondary"><span className="sm:hidden">Next</span><span className="hidden sm:inline">Next project</span><ChevronRight aria-hidden="true" className="size-4" /></button>
      </div>
    </dialog>
  )
}
