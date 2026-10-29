import { CalendarDays, GraduationCap, Heart, MapPin, Quote, School, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { about } from '../../data/about'
import { skillGroups } from '../../data/skills'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'

const factIcons: Record<string, LucideIcon> = {
  'Based in': MapPin,
  Degree: GraduationCap,
  University: School,
  'Expected graduation': CalendarDays,
  Focus: Target,
}
const badges = [
  ...(about.facts.find((fact) => fact.label === 'Focus')?.value.split(' & ')
    .map((value) => value.replace(/\b\w/g, (letter) => letter.toUpperCase())) ?? []),
  ...skillGroups.flatMap((group) => group.skills)
    .filter((skill) => skill === 'Front-End Development')
    .map((skill) => skill.replace(' Development', '')),
]

export function About() {
  return (
    <Section id="about" labelledBy="about-title" className="border-t border-forest/10 dark:border-cream/20">
      <SectionHeading
        icon={Heart}
        id="about-title"
        eyebrow="01 — About"
        title="A developer in the making."
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-5">
        <article className="relative flex min-w-0 flex-col justify-between gap-6 rounded-3xl border border-forest/10 bg-cream p-6 shadow-sm motion-safe:hover:-translate-y-0.5 dark:border-cream/20 dark:bg-forest lg:col-span-3">
          <Quote aria-hidden="true" className="absolute top-6 right-6 size-8 text-blush opacity-60" strokeWidth={1.5} />
          <div>
            <h3 className="mr-10 inline-flex rounded-full bg-blush px-3 py-1.5 text-label font-semibold tracking-widest text-forest uppercase">
              Career objective
            </h3>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-forest md:text-base dark:text-cream">
              {about.objective}
            </p>
          </div>
          <ul aria-label="Areas of focus" className="flex flex-wrap gap-2">
            {badges.map((badge) => <li key={badge} className="rounded-full border border-forest/10 bg-blush px-2.5 py-1 text-xs font-medium text-forest">{badge}</li>)}
          </ul>
        </article>

        <aside
          aria-label="Quick facts"
          className="flex h-full min-w-0 flex-col justify-between rounded-3xl border border-forest/10 bg-cream p-5 shadow-sm motion-safe:hover:-translate-y-0.5 dark:border-cream/20 dark:bg-forest lg:col-span-2"
        >
          <h3 className="w-fit rounded-full bg-blush px-3 py-1.5 text-label font-semibold tracking-widest text-forest uppercase">
            Quick facts
          </h3>
          <dl className="mt-3 divide-y divide-forest/10 dark:divide-cream/10">
            {about.facts.map((fact) => {
              const FactIcon = factIcons[fact.label] ?? Target
              return (
              <div
                key={fact.label}
                className="flex items-center justify-between gap-2 py-3"
              >
                <dt className="flex min-w-0 flex-1 items-center gap-2 text-xs text-sage dark:text-cream/70">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blush text-forest">
                    <FactIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </span>
                  <span>{fact.label}</span>
                </dt>
                <dd className="min-w-0 max-w-1/2 text-right text-sm leading-relaxed font-medium text-forest dark:text-cream">{fact.value}</dd>
              </div>
              )
            })}
          </dl>
        </aside>
      </div>
    </Section>
  )
}
