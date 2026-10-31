import { Footer } from './components/Footer'
import { NavBar } from './components/NavBar'
import { About } from './features/about/About'
import { Contact } from './features/contact/Contact'
import { Education } from './features/education/Education'
import { Hero } from './features/hero/Hero'
import { Projects } from './features/projects/Projects'
import { Skills } from './features/skills/Skills'
import { useMotion } from './hooks/useMotion'

function App() {
  useMotion()
  return (
    <div className="page-layout">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>

      <NavBar />

      <main id="main-content">
        <Hero />
        <About />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
