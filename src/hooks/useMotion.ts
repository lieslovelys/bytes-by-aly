import { useEffect } from 'react'

const revealTargets = [
  '.top-bar > .shell',
  '[data-reveal]',
  'main section:not(#top) header',
  '.education-entry',
  '.bento-item',
  'main aside',
  '.skill-group',
  '.hero-copy',
  '.hero-profile',
  '.portrait-mosaic',
  '#about dl > div',
  '#contact article',
  '.footer-content > div',
].join(', ')

/** Enhance existing content, including cards loaded after the first render. */
export function useMotion() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!('IntersectionObserver' in window)) return
    const seen = new WeakSet<Element>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return
        target.setAttribute('data-visible', 'true')
        observer.unobserve(target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 })
    const discover = () => {
      document.querySelectorAll(revealTargets).forEach((element) => {
        if (seen.has(element)) return
        // Animate a block once, rather than stacking motion on its children.
        if (element.parentElement?.closest('.scroll-reveal')) return
        seen.add(element)
        const siblings = Array.from(element.parentElement?.children ?? []).filter((sibling) => sibling.matches(revealTargets))
        if (element instanceof HTMLElement) element.style.setProperty('--reveal-delay', `${Math.max(0, siblings.indexOf(element)) % 6 * 70}ms`)
        observer.observe(element)
        element.classList.add('scroll-reveal')
        element.setAttribute('data-visible', media.matches ? 'true' : 'false')
      })
    }
    const reveal = () => {
      if (media.matches) document.querySelectorAll('[data-visible]').forEach((element) => element.setAttribute('data-visible', 'true'))
    }
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      const element = event.target.closest('.scroll-reveal')
      if (!element) return
      // Keyboard navigation must not wait for a reveal or its stagger delay.
      element.setAttribute('data-reveal-immediate', '')
      element.setAttribute('data-visible', 'true')
      observer.unobserve(element)
    }
    discover()
    const mutations = new MutationObserver(discover)
    mutations.observe(document.getElementById('root')!, { childList: true, subtree: true })
    media.addEventListener('change', reveal)
    document.addEventListener('focusin', revealFocused)
    return () => { observer.disconnect(); mutations.disconnect(); media.removeEventListener('change', reveal); document.removeEventListener('focusin', revealFocused); document.querySelectorAll('.scroll-reveal').forEach((element) => { element.classList.remove('scroll-reveal'); element.removeAttribute('data-visible'); element.removeAttribute('data-reveal-immediate') }) }
  }, [])
}
