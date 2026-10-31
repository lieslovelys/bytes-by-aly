import { createElement, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Code2, Database, Info, Layers, Sparkles, Wrench, X } from 'lucide-react'
import type { skills } from '../../worker/db/schema'
import { skillDescriptions } from '../../data/skillDescriptions'
import { useApiList } from '../../hooks/useApiList'
import { ListStatus } from '../../components/ListStatus'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'

const groupIcons = [Code2, Database, Layers, Sparkles]
interface OpenSkill { id: string; name: string; category: string; trigger: HTMLButtonElement }

export function Skills() {
  const state = useApiList<typeof skills.$inferSelect>('/api/skills')
  const [active, setActive] = useState<OpenSkill | null>(null)
  const [expanded, setExpanded] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const skillGroups = Array.from(new Set(state.data.map((skill) => skill.category))).map((category, index) => ({
    id: String(index), name: category,
    skills: state.data.filter((skill) => skill.category === category),
  }))

  useLayoutEffect(() => {
    if (!active || !expanded) return
    const update = () => {
      if (!panel.current) return
      const anchor = active.trigger.getBoundingClientRect()
      const bounds = panel.current.getBoundingClientRect()
      panel.current.style.setProperty('--pointer-left', `${Math.max(12, Math.min(anchor.left + anchor.width / 2 - bounds.left, bounds.width - 12))}px`)
    }
    update()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scrollTimer = window.setTimeout(() => {
      if (!panel.current) return
      const bounds = panel.current.getBoundingClientRect()
      const dockTop = document.querySelector('.section-dock')?.getBoundingClientRect().top ?? window.innerHeight
      if (bounds.bottom > Math.min(window.innerHeight, dockTop) - 16 || bounds.top < 16) {
        panel.current.scrollIntoView({ block: 'nearest', behavior: reduced ? 'instant' : 'smooth' })
      }
    }, reduced ? 0 : parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-base')))
    const observer = new ResizeObserver(update)
    if (panel.current) observer.observe(panel.current)
    window.addEventListener('resize', update)
    return () => { clearTimeout(scrollTimer); observer.disconnect(); window.removeEventListener('resize', update) }
  }, [active, expanded])

  useEffect(() => {
    if (!active || !expanded) return
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setExpanded(false); active.trigger.focus({ preventScroll: true }) }
    }
    document.addEventListener('keydown', escape)
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !panel.current?.contains(event.target) && !active.trigger.contains(event.target)) setExpanded(false)
    }
    document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside) }
  }, [active, expanded])

  return <Section id="skills" labelledBy="skills-title" className="bg-surface">
    <SectionHeading icon={Wrench} id="skills-title" eyebrow="04 — Skills" title="Tools I work with." subtitle="The stack I reach for when turning an idea into a working interface or a dependable data flow." />
    <ul className="skills-grid">
      {state.status !== 'success' && <li className="col-span-full"><ListStatus status={state.status} retry={state.retry} /></li>}
      {skillGroups.map((group, index) => <li key={group.id} className="skill-group">
        <section aria-labelledby={`skill-group-${group.id}`}>
          <div className="skill-group-heading"><span className="soft-icon">{createElement(groupIcons[index % groupIcons.length]!, { 'aria-hidden': true, className: 'size-5', strokeWidth: 1.5 })}</span><h3 id={`skill-group-${group.id}`}>{group.name}</h3><span className="meta-pill">{group.skills.length} skills</span></div>
          <ul className="skill-chips">
            {group.skills.map((skill) => {
              const open = expanded && active?.id === skill.id
              return <li key={skill.id}><button type="button" className="skill-chip" aria-expanded={open} aria-controls={`skill-description-${group.id}`} onClick={(event) => {
                setActive({ id: skill.id, name: skill.name, category: group.name, trigger: event.currentTarget })
                setExpanded(!open)
              }}>{skill.name}<Info aria-hidden="true" className="size-3.5 shrink-0" /></button></li>
            })}
          </ul>
          <div className="skill-expand" data-open={expanded && active?.category === group.name} inert={!expanded || active?.category !== group.name} aria-hidden={!expanded || active?.category !== group.name}>
            <div className="skill-expand-clip">
              <div ref={active?.category === group.name ? panel : undefined} id={`skill-description-${group.id}`} role="region" aria-labelledby={active?.category === group.name ? `skill-name-${active.id}` : `skill-group-${group.id}`} className="skill-description">
                {active?.category === group.name && <>
                  <div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="eyebrow">{group.name}</p><h4 id={`skill-name-${active.id}`} className="mt-1 font-heading text-xl font-semibold">{active.name}</h4></div><button type="button" aria-label={`Close ${active.name} description`} className="skill-close" onClick={() => { setExpanded(false); active.trigger.focus({ preventScroll: true }) }}><X aria-hidden="true" className="size-4" /></button></div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{Object.hasOwn(skillDescriptions, active.name) ? skillDescriptions[active.name] : `${active.name} is listed in ${group.name}.`}</p>
                </>}
              </div>
            </div>
          </div>
        </section>
      </li>)}
    </ul>
  </Section>
}
