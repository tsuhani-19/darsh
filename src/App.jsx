import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AssistantWidget from './components/AssistantWidget.jsx'
import BackToTop from './components/BackToTop.jsx'
import CursorGlow from './components/fx/CursorGlow.jsx'
import IntroLoader from './components/IntroLoader.jsx'
import Grain from './components/fx/Grain.jsx'
import { ScrollProgress } from './components/ui.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    // Framer drives transforms from JS, so the reduced-motion rule in index.css
    // (which only reaches CSS animations) never touched any of it. This makes
    // the whole motion layer honour the preference for real.
    <MotionConfig reducedMotion="user">
      <IntroLoader />
      <ScrollProgress />
      <ScrollToTop />
      <CursorGlow />
      <Grain />
      {/* First thing in the tab order: the nav is long and repeats on every
          page, so a keyboard visitor gets one keystroke past it. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[110] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-[0.85rem] focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
      <AssistantWidget />
    </MotionConfig>
  )
}
