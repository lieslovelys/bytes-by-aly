import { useEffect, useRef, useState } from 'react'

const GLYPHS = '0123456789_#@%&<>{}/*~'

interface DecryptedTextProps {
  text: string
  className?: string
}

export function DecryptedText({ text, className }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animate()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(element)
    return () => observer.disconnect()

    function animate() {
      const length = text.length
      const duration = 500
      const start = performance.now()

      const frame = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(1, elapsed / duration)
        const lockedCount = Math.floor(progress * length)

        let result = ''
        for (let i = 0; i < length; i++) {
          if (text[i] === ' ' || text[i] === '—' || text[i] === '-') {
            result += text[i]
          } else if (i < lockedCount) {
            result += text[i]
          } else {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          }
        }

        setDisplayText(result)

        if (progress < 1) {
          requestAnimationFrame(frame)
        } else {
          setDisplayText(text)
        }
      }

      requestAnimationFrame(frame)
    }
  }, [text, hasAnimated])

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  )
}
