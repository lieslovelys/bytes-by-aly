import { site } from '../../data/site'
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
      className="border-t border-forest/10 pb-10 dark:border-cream/20 md:pb-10"
    >
      <div>
        <div className="mb-6 md:mb-8 [&_header]:mb-0 [&_header>div]:mt-3">
          <SectionHeading
            icon={Mail}
            id="contact-title"
            eyebrow="05 — Contact"
            title="Let's build something useful."
          />
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-sage dark:text-cream md:text-base">
            I'm currently looking for an entry-level Web Developer role. If
            you have an opportunity, a project in mind, or just want to say
            hello, my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">
          <article aria-label="Contact form" className="min-w-0 rounded-3xl border border-cream/10 bg-forest p-5 text-cream md:p-6 lg:col-span-3">
            <ContactForm />
          </article>
          <aside aria-labelledby="reach-me-title" className="flex h-full min-w-0 flex-col rounded-3xl border border-cream/10 bg-forest p-5 text-cream md:p-6 lg:col-span-2">
            <h3 id="reach-me-title" className="mb-3 w-fit rounded-full bg-blush px-2.5 py-1 text-xs font-semibold tracking-widest text-forest uppercase">REACH ME</h3>
            <ul className="flex flex-1 flex-col justify-between divide-y divide-cream/10">
              {contactRows.map(({ label, value, href, icon: RowIcon, external, accessibleName }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={accessibleName}
                    className="group flex min-h-11 w-full items-center gap-3 rounded-2xl px-2 py-3 transition-colors hover:bg-cream/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush text-forest transition-colors group-hover:bg-blush-deep">
                      {typeof RowIcon === 'string'
                        ? <Icon name={RowIcon} className="h-4 w-4" />
                        : <RowIcon className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-cream/70">{label}</span>
                      <span className="block text-sm break-words">{value}</span>
                    </span>
                    {external && <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  </a>
                </li>
              ))}
              <li className="flex min-h-11 items-center gap-3 px-2 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush text-forest">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-cream/70">Location</span>
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
