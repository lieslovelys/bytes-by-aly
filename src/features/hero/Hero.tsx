import { site } from '../../data/site'
import { hero } from '../../data/hero'
import { ButtonLink } from '../../components/ButtonLink'
import { Icon } from '../../components/Icon'

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-8 -left-24 size-72 rounded-full bg-accent/10 blur-3xl sm:size-96" />
        <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-accent/5 blur-3xl sm:size-96" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {hero.availability}
            </p>

            <p className="mt-7 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {hero.greeting}
            </p>

            <h1
              id="hero-title"
              className="mt-3 max-w-2xl text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {site.name}
            </h1>

            <p className="mt-4 max-w-xl text-lg font-medium text-ink sm:text-xl">
              {site.title}
            </p>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              {site.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="#projects"
                icon={<Icon name="arrow-down" className="size-4" />}
              >
                View Projects
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Contact
              </ButtonLink>
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <Icon name="map-pin" className="size-4 shrink-0 text-accent" />
              <span>{site.location}</span>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-accent/5"
            />
            <div className="relative rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-lg font-bold text-accent"
                >
                  {site.initials}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{site.shortName}</p>
                  <p className="text-xs text-muted">BS Computer Engineering</p>
                </div>
                <span className="ml-auto rounded-full border border-line bg-surface-muted px-2.5 py-1 text-xs font-semibold text-muted">
                  2027
                </span>
              </div>

              <dl className="mt-6 space-y-3.5 border-t border-line pt-6 text-sm">
                {hero.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt className="text-muted">{fact.label}</dt>
                    <dd className="text-right font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 rounded-2xl bg-surface-muted p-4">
                <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-muted uppercase">
                  Currently
                </p>
                <p className="mt-1.5 text-sm leading-6">
                  {hero.currently}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
