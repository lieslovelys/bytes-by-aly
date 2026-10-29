import { education } from '../../data/education'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'
import { Tag } from '../../components/Tag'

export function Education() {
  return (
    <Section
      id="education"
      labelledBy="education-title"
      className="border-t border-line"
    >
      <SectionHeading
        id="education-title"
        eyebrow="02 — Education"
        title="Education"
        description="Where I'm learning the fundamentals behind the interfaces I build."
      />

      <ol className="mt-12 space-y-6">
        {education.map((entry) => (
          <li
            key={entry.id}
            className="relative border-l border-line pl-6 sm:pl-8"
          >
            <span
              aria-hidden="true"
              className="absolute top-7 -left-[7px] size-3.5 rounded-full border-2 border-accent bg-canvas"
            />

            <article className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                    Bachelor of Science
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    {entry.program}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted sm:text-base">
                    {entry.school} · {entry.campus}
                  </p>
                </div>
                <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  {entry.expectedGraduation}
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
                {entry.description}
              </p>

              <div className="mt-6 border-t border-line pt-5">
                <h4 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                  Focus areas
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.focusAreas.map((area) => (
                    <li key={area}>
                      <Tag>{area}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="sr-only">
                {entry.degree} at {entry.school}, {entry.campus}.{' '}
                {entry.expectedGraduation}.
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
