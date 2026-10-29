import { useEffect } from 'react'

/** Enhance existing content, including cards loaded after the first render. */
export function useMotion() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const seen = new WeakSet<Element>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        target.setAttribute('data-visible', 'true')
        observer.unobserve(target)
      })
    }, { rootMargin: '-10% 0px -10% 0px', threshold: 0 })
    const discover = () => {
      document.querySelectorAll('main section:not(#top) header, main article, main aside, #skills section').forEach((element) => {
        if (seen.has(element)) return
        seen.add(element)
        const siblings = Array.from(element.parentElement?.children ?? [])
        element.setAttribute('data-index', String(siblings.indexOf(element) % 12))
        element.classList.add('motion-safe:transition-[transform,opacity]', 'motion-safe:duration-700', 'motion-safe:ease-out', 'motion-safe:data-[visible=false]:opacity-0', 'motion-safe:data-[visible=false]:translate-y-6', 'motion-safe:delay-[var(--reveal-delay,0ms)]')
        element.setAttribute('data-visible', media.matches ? 'true' : 'false')
        observer.observe(element)
      })
    }
    const reveal = () => {
      if (media.matches) document.querySelectorAll('[data-visible]').forEach((element) => element.setAttribute('data-visible', 'true'))
    }
    discover()
    const mutations = new MutationObserver(discover)
    mutations.observe(document.getElementById('main-content')!, { childList: true, subtree: true })
    media.addEventListener('change', reveal)
    return () => { observer.disconnect(); mutations.disconnect(); media.removeEventListener('change', reveal) }
  }, [])
}
