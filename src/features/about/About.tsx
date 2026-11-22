import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { about } from '../../data/about'
import { Section } from '../../components/Section'
import { SectionHeading } from '../../components/SectionHeading'
import { Tag } from '../../components/Tag'

// Curated 6x6 mosaic tile configurations framing the portrait
// Center face area (cols 2-3, rows 1-3) is kept clear
const MOSAIC_PATTERNS = [
  new Set([0, 2, 4, 7, 11, 12, 16, 23, 25, 30, 33]),
  new Set([1, 3, 5, 6, 10, 13, 17, 18, 22, 24, 29, 31, 34]),
  new Set([0, 1, 4, 5, 6, 11, 12, 17, 22, 25, 28, 30, 32, 35]),
  new Set([2, 5, 7, 10, 12, 17, 19, 22, 24, 27, 31, 35]),
]

export function About() {
  const [patternIndex, setPatternIndex] = useState(0)
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setPatternIndex((prev) => (prev + 1) % MOSAIC_PATTERNS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const currentPattern = MOSAIC_PATTERNS[patternIndex]!

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPointer({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const handlePointerLeave = () => {
    setPointer(null)
  }

  return <Section id="about" labelledBy="about-title" className="red-block">
    <div className="grid items-center gap-[var(--layout-gap)] lg:grid-cols-2">
      <div data-reveal><SectionHeading icon={Heart} id="about-title" eyebrow="01 — The introduction" title="About me" /><p className="max-w-lg text-sm leading-7 md:text-base">{about.objective}</p><p className="mt-7 mb-3 font-heading text-2xl italic">My focus</p><div className="flex flex-wrap gap-2"><Tag>Web development</Tag><Tag>Databases</Tag><Tag>Front-End</Tag></div></div>
      <div
        className="portrait-mosaic"
        style={{ touchAction: 'pan-y' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >
        <img
          src="/images/mae.jpg"
          alt="Portrait of Alyssa Mae Esponilla in a checkerboard composition"
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-[50%_25%]"
        />
        <div className="about-tile-grid" aria-hidden="true">
          {Array.from({ length: 36 }, (_, i) => {
            const col = i % 6
            const row = Math.floor(i / 6)
            const cellX = (col + 0.5) / 6
            const cellY = (row + 0.5) / 6

            let isErased = false
            if (pointer) {
              const dx = cellX - pointer.x
              const dy = cellY - pointer.y
              if (dx * dx + dy * dy < 0.045) {
                isErased = true
              }
            }

            const active = currentPattern.has(i) && !isErased
            return (
              <span
                key={i}
                className={`about-tile-cell ${active ? 'about-tile-active' : ''} ${isErased ? 'about-tile-erased' : ''}`}
                style={{
                  transitionDelay: isErased ? '0ms' : `${(col + row) * 45}ms`,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
    <dl className="mt-[var(--content-gap)] grid gap-[var(--item-gap)] border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-5">{about.facts.map((fact) => <div key={fact.label}><dt className="mb-2 text-[10px] tracking-widest uppercase opacity-70">{fact.label}</dt><dd className="text-sm">{fact.value}</dd></div>)}</dl>
  </Section>
}
