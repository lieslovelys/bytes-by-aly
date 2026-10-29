import { site } from '../../data/site'
import { hero } from '../../data/hero'
import { ButtonLink } from '../../components/ButtonLink'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-20 overflow-hidden bg-forest pt-4 pb-10 text-cream md:pt-6 md:pb-14 [&_:focus-visible]:outline-blush"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-8 -left-24 size-72 rounded-full bg-blush/10 blur-3xl sm:size-96" />
        <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-blush/5 blur-3xl sm:size-96" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-forest px-3 py-1 text-xs font-medium text-cream">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blush opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-blush" />
              </span>
              {hero.availability}
            </p>

            <p className="mt-4 text-label font-semibold tracking-widest text-blush uppercase">
              {hero.greeting}
            </p>

            <SectionHeading
              icon={Sparkles}
              level="h1"
              id="hero-title"
              title={site.name}
            />

            <p className="mt-2 max-w-xl text-sm leading-relaxed font-medium text-cream motion-safe:animate-fade-up motion-safe:[animation-delay:100ms]">
              {site.title}
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]">
              {site.intro}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 motion-safe:animate-fade-up motion-safe:[animation-delay:300ms]">
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

            <p className="mt-4 flex items-center gap-2 text-xs text-cream">
              <Icon name="map-pin" className="size-4 shrink-0 text-blush" />
              <span>{site.location}</span>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-blush/10"
            />
            <div className="relative rounded-3xl border border-forest/10 bg-cream p-5 text-forest shadow-sm dark:border-cream/20 dark:bg-forest dark:text-cream [&_:focus-visible]:outline-forest dark:[&_:focus-visible]:outline-blush">
              <div className="flex items-center gap-2 md:gap-3">
                <Avatar size="lg" className="max-md:h-14 max-md:w-14" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold whitespace-nowrap sm:text-sm">{site.shortName}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-xs leading-relaxed text-sage dark:text-cream">BS Computer Engineering</p>
                    <span className="rounded-full border border-forest/10 bg-blush px-2.5 py-0.5 text-xs font-semibold text-forest md:hidden">2027</span>
                  </div>
                </div>
                <span className="ml-auto hidden shrink-0 rounded-full border border-forest/10 bg-blush px-2.5 py-0.5 text-xs font-semibold text-forest md:inline-flex">
                  2027
                </span>
              </div>

              <dl className="mt-4 border-t border-forest/10 pt-4 text-xs leading-relaxed dark:border-cream/20">
                {hero.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-3 py-1.5"
                  >
                    <dt className="text-sage dark:text-cream">{fact.label}</dt>
                    <dd className="text-right font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 rounded-3xl bg-blush p-4 text-forest">
                <p className="text-label font-semibold tracking-widest text-forest uppercase">
                  Academic Achievement
                </p>
                <p className="mt-1.5 text-sm leading-relaxed">
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
import { Sparkles } from 'lucide-react'
import { SectionHeading } from '../../components/SectionHeading'
