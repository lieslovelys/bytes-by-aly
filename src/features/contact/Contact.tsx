import { site } from '../../data/site'
import { ButtonLink } from '../../components/ButtonLink'
import { Icon } from '../../components/Icon'
import { Section } from '../../components/Section'

export function Contact() {
  return (
    <Section
      id="contact"
      labelledBy="contact-title"
      className="border-t border-line pb-24 sm:pb-32"
    >
      <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface px-6 py-12 shadow-sm sm:px-10 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-20 -right-16 size-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 size-64 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              05 — Contact
            </p>
            <h2
              id="contact-title"
              className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            >
              Let's build something useful.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              I'm currently looking for an entry-level Web Developer role. If
              you have an opportunity, a project in mind, or just want to say
              hello, my inbox is open.
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={`mailto:${site.email}`}
                className="w-full sm:w-auto"
                icon={<Icon name="mail" className="size-4" />}
                iconPosition="left"
              >
                Email me
              </ButtonLink>
              <ButtonLink
                href={site.resumeUrl}
                download
                variant="secondary"
                className="w-full sm:w-auto"
                icon={<Icon name="download" className="size-4" />}
              >
                Download Resume
              </ButtonLink>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Find me online
              </span>
              <ul className="flex items-center gap-2">
                {site.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (opens in a new tab)`}
                      className="grid size-10 place-items-center rounded-full border border-line bg-canvas text-muted transition-colors hover:border-accent/50 hover:bg-accent-soft hover:text-accent"
                    >
                      <Icon name={social.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 font-medium text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            <Icon name="mail" className="size-4 text-accent" />
            {site.email}
          </a>
          <p className="inline-flex items-center gap-2 text-muted">
            <Icon name="map-pin" className="size-4 text-accent" />
            {site.location}
          </p>
        </div>
      </div>
    </Section>
  )
}
