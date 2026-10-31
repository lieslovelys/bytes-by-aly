import { useEffect, useState } from 'react'

/** Track the section crossing a narrow band near the top of the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids.flatMap((id) => {
      const element = document.getElementById(id)
      return element ? [element] : []
    })
    const update = () => {
      const boundary = window.innerHeight * 0.25 + 2
      let current = ids[0] ?? ''
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= boundary) current = element.id
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1] ?? current
      }
      setActiveId(current)
    }
    let observer: IntersectionObserver | undefined
    const observe = () => {
      if (!('IntersectionObserver' in window)) { update(); return }
      observer?.disconnect()
      const top = window.innerHeight * 0.25
      const bottom = Math.max(0, window.innerHeight - top - 2)
      observer = new IntersectionObserver(update, {
        rootMargin: `-${top}px 0px -${bottom}px 0px`,
        threshold: 0,
      })
      elements.forEach((element) => observer?.observe(element))
      update()
    }
    observe()
    window.addEventListener('resize', observe)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', observe)
      window.removeEventListener('scroll', update)
    }
  }, [ids])

  return activeId
}
