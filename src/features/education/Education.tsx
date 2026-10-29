import { education } from '../../data/education'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'

export function Education() {
  return <Section id="education" labelledBy="education-title" className="border-t border-forest/10 bg-blush/20 dark:border-cream/20 dark:bg-forest-dark">
    <SectionHeading icon={GraduationCap} id="education-title" eyebrow="02 — Education" title="Education" />
    <ol className="space-y-4">
      {education.map((entry) => <li key={entry.id} className="relative border-l border-forest/10 pl-5 dark:border-cream/20 sm:pl-6">
        <span aria-hidden="true" className="absolute top-7 -left-[7px] size-3.5 rounded-full border-2 border-forest bg-blush dark:border-blush" />
        <article className="rounded-3xl border border-forest/10 bg-cream p-5 shadow-sm dark:border-cream/20 dark:bg-forest md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base leading-tight font-semibold tracking-tight text-balance">{entry.degree}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-sage dark:text-cream">{entry.school}</p>
            </div>
            <span className="rounded-full border border-forest/10 bg-blush px-2.5 py-0.5 text-xs font-semibold text-forest">{entry.period}</span>
          </div>
        </article>
      </li>)}
    </ol>
  </Section>
}
import { GraduationCap } from 'lucide-react'
