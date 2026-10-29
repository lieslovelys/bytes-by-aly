interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted">{description}</p>
      ) : null}
    </header>
  )
}
