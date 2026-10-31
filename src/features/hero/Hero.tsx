import { ArrowDown, Award } from 'lucide-react'
import { site } from '../../data/site'
import { hero } from '../../data/hero'
import { academicAchievement } from '../../data/achievements'

const achievementParts = academicAchievement.match(/^(.*?)\s+(\d+(?:st|nd|rd|th)\s+place)\s*[–—-]\s*(.*?)\s*\((\d{4})\)$/i)
const achievementRank = achievementParts?.[2] ?? ''
const achievementTitle = achievementParts
  ? `${achievementParts[1]} · ${achievementParts[3]} ${achievementParts[4]}`
  : academicAchievement

export function Hero() {
  return <section id="top" aria-labelledby="hero-title" className="poster-hero">
    <div className="bg-art" aria-hidden="true">
      <span className="bg-grid" />
      <span className="bg-glow bg-glow-left" /><span className="bg-glow bg-glow-top" />
      <span className="bg-monogram">A</span>
      <svg className="bg-shapes" width="100%" height="100%" aria-hidden="true">
        <path d="M12 0v16m-8-8h16" transform="translate(45 135)" />
        <path d="m0 12 4-8 4 8 8 4-8 4-4 8-4-8-8-4Z" transform="translate(640 105)" />
        <path d="M0 12Q15-8 30 12T60 12T90 12T120 12" transform="translate(70 570)" />
      </svg>
      <div className="bg-chips"><span className="hero-chip-relocated">{'</>'}</span><span>{'{ }'}</span><span>git push</span><span>npm run dev</span><span className="hero-chip-relocated">.tsx</span><span>const aly =</span></div>
    </div>
    <div className="shell hero-shell">
      <div className="hero-composition">
        <div className="hero-copy min-w-0">
          <p className="poster-word">Developer Portfolio</p>
          <h1 id="hero-title" className="poster-name">{site.name}</h1>
          <p className="hero-role">Web <strong>Developer.</strong></p>
          <p className="hero-intro">{site.intro}</p>
          <p className="availability-pill"><span className="status-dot" aria-hidden="true" />{hero.availability}</p>
          <a href="#projects" className="inline-flex min-h-11 items-center gap-3 border-b border-current text-xs font-semibold uppercase">Discover my work <ArrowDown aria-hidden="true" className="size-4" /></a>
        </div>
        <div className="hero-profile">
          <div className="bg-art hero-profile-art" aria-hidden="true">
            <span className="bg-glow bg-glow-right" />
            <svg className="bg-shapes" width="100%" height="100%"><circle cx="85%" cy="24%" r="100" /><circle cx="85%" cy="24%" r="120" /></svg>
          </div>
          <div className="bg-chips hero-photo-chips" aria-hidden="true"><span>{'</>'}</span><span>.tsx</span></div>
          <svg className="bg-orbit" viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="200" cy="260" rx="195" ry="250" /></svg>
          <div className="profile-window">
            <div className="profile-titlebar" aria-hidden="true">
              <span className="window-controls"><span /><span /><span /></span>
              <span>aly.jpg</span>
              <span className="window-filetype">IMG</span>
            </div>
            <div className="hero-photo"><img src="/images/alymae.jpg" alt="Portrait of Alyssa Mae I. Esponilla" width={640} height={800} loading="eager" decoding="async" fetchPriority="high" /></div>
          </div>
          <svg className="profile-code" viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m18 14-10 10 10 10m28-20 10 10-10 10M38 8 26 40" /></svg>
          <p className="achievement-badge">
            <span className="achievement-medal"><Award aria-hidden="true" className="size-6" /></span>
            <span className="achievement-copy">
              {achievementRank && <span className="achievement-rank">{achievementRank}</span>}
              <span className="achievement-title">{achievementTitle}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <svg className="hero-divider" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60Q360 0 720 45T1440 30V80H0Z" /></svg>
  </section>
}
