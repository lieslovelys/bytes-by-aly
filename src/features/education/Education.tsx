import { GraduationCap, School } from 'lucide-react'
import { education } from '../../data/education'
import { Section } from '../../components/Section'

export function Education() {
  return <Section id="education" labelledBy="education-title" className="bg-surface">
    <div className="education-layout">
      <div className="education-summary">
        <header className="education-heading">
          <p className="eyebrow flex items-center gap-2"><GraduationCap aria-hidden="true" className="size-4" strokeWidth={1.6} />02 — Education</p>
          <h2 id="education-title" className="education-title"><span>Learning.</span>{' '}<span>Building.</span>{' '}<span>Growing.</span></h2>
        </header>
      </div>
      <ol className="education-timeline">
        {education.map((entry, index) => <li key={entry.id} className="education-entry">
          <span aria-hidden="true" className={`education-marker ${index === 0 ? 'education-marker-current' : ''}`} />
          <article className="education-card">
            <p className="education-period">{entry.period}</p>
            <h3 className="education-degree">{entry.degree}</h3>
            <p className="education-school"><School aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.6} /><span>{entry.school}</span></p>
          </article>
        </li>)}
      </ol>
    </div>
  </Section>
}
