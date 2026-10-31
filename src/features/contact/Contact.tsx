import { site } from '../../data/site'
import { hero } from '../../data/hero'
import { contact, contactEmail, emailComposeUrl } from '../../data/contact'
import { ExternalLink, Mail, MapPin, MessageCircle } from 'lucide-react'
import { ContactForm } from './ContactForm'
import { Icon } from '../../components/Icon'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'

const contactRows = [
  { label: 'Email', value: contactEmail, href: emailComposeUrl, icon: Mail, external: true, accessibleName: `Email ${contactEmail}, opens Gmail compose in a new tab` },
  { label: 'Telegram', value: '@lieslovelys', href: contact.telegram, icon: MessageCircle, external: true, accessibleName: 'Telegram, opens t.me/lieslovelys in a new tab' },
  { label: 'GitHub', value: 'github.com/lieslovelys', href: contact.github, icon: 'github', external: true, accessibleName: 'GitHub, opens github.com/lieslovelys in a new tab' },
  { label: 'LinkedIn', value: 'Alyssa Mae Esponilla', href: contact.linkedin, icon: 'linkedin', external: true, accessibleName: 'LinkedIn, opens Alyssa Mae Esponilla’s profile in a new tab' },
] as const

export function Contact() {
  return (
    <Section
      id="contact"
      labelledBy="contact-title"
    >
      <div>
        <div data-reveal className="mb-[var(--content-gap)] [&_header]:mb-4">
          <SectionHeading
            icon={Mail}
            id="contact-title"
            eyebrow="05 — Contact"
            title="Let's build something useful."
          />
          <p className="availability-pill"><span className="status-dot" aria-hidden="true" />{hero.availability}</p>
          <p className="mt-3 max-w-prose text-sm leading-7 text-muted md:text-base">
            I'm currently looking for an entry-level Web Developer role. If
            you have an opportunity, a project in mind, or just want to say
            hello, my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">
          <article aria-label="Contact form" className="panel lg:col-span-3">
            <h3 className="mb-6 text-2xl font-semibold">Send a note</h3>
            <ContactForm />
          </article>
          <aside aria-labelledby="reach-me-title" className="panel flex h-full flex-col bg-tint lg:col-span-2">
            <h3 id="reach-me-title" className="mb-5 text-2xl font-semibold">Elsewhere &amp; directly</h3>
            <ul className="flex flex-1 flex-col justify-between divide-y divide-line">
              {contactRows.map(({ label, value, href, icon: RowIcon, external, accessibleName }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={accessibleName}
                    className="contact-link group flex min-h-11 w-full items-center gap-3 rounded-lg py-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent">
                      {typeof RowIcon === 'string'
                        ? <Icon name={RowIcon} className="h-4 w-4" />
                        : <RowIcon className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">{label}</span>
                      <span className="block text-sm break-words">{value}</span>
                    </span>
                    {external && <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  </a>
                </li>
              ))}
              <li className="flex min-h-11 items-center gap-3 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Location</span>
                  <span className="block text-sm break-words">{site.location}</span>
                </span>
              </li>
            </ul>
          </aside>
        </div>

      </div>
    </Section>
  )
}
