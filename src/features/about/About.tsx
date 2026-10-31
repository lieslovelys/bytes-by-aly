import { Heart } from 'lucide-react'
import { about } from '../../data/about'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'
import { Tag } from '../../components/Tag'

const tiles = [[0, 0], [2, 0], [4, 0], [1, 1], [5, 1], [0, 2], [4, 2], [5, 3], [1, 4], [3, 5], [0, 5]]
export function About() {
  return <Section id="about" labelledBy="about-title" className="red-block">
    <div className="grid items-center gap-[var(--layout-gap)] lg:grid-cols-2">
      <div data-reveal><SectionHeading icon={Heart} id="about-title" eyebrow="01 — The introduction" title="About me" /><p className="max-w-lg text-sm leading-7 md:text-base">{about.objective}</p><p className="mt-7 mb-3 font-heading text-2xl italic">My focus</p><div className="flex flex-wrap gap-2"><Tag>Web development</Tag><Tag>Databases</Tag><Tag>Front-End</Tag></div></div>
      <div className="portrait-mosaic"><img src="/images/mae.jpg" alt="Portrait of Alyssa Mae Esponilla in a checkerboard composition" width={640} height={640} loading="lazy" decoding="async" className="size-full object-cover object-[50%_25%]" />{tiles.map(([x, y]) => <span key={`${x}-${y}`} aria-hidden="true" className="mosaic-tile" style={{ left: `${x! * 100 / 6}%`, top: `${y! * 100 / 6}%` }} />)}</div>
    </div>
    <dl className="mt-[var(--content-gap)] grid gap-[var(--item-gap)] border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-5">{about.facts.map((fact) => <div key={fact.label}><dt className="mb-2 text-[10px] tracking-widest uppercase opacity-70">{fact.label}</dt><dd className="text-sm">{fact.value}</dd></div>)}</dl>
  </Section>
}
