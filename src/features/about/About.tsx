import { about } from '../../data/about'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'

export function About() {
  return (
    <Section id="about" labelledBy="about-title" className="border-t border-line">
      <SectionHeading
        id="about-title"
        eyebrow="01 — About"
        title="A developer in the making."
        description="I like taking a real-world process, breaking it down, and turning it into something people can use without a manual."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="border-l-2 border-accent pl-5 sm:pl-7">
          <h3 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Career objective
          </h3>
          <p className="mt-4 text-lg leading-8 text-ink sm:text-xl sm:leading-9">
            {about.objective}
          </p>
        </div>

        <aside
          aria-label="Quick facts"
          className="h-fit rounded-2xl border border-line bg-surface p-6 sm:p-7"
        >
          <h3 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Quick facts
          </h3>
          <dl className="mt-5 space-y-4 text-sm">
            {about.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-line pb-4 last:border-none last:pb-0"
              >
                <dt className="text-muted">{fact.label}</dt>
                <dd className="mt-1 font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  )
}
