import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AssistantWidget from './components/AssistantWidget.jsx'
import CursorGlow from './components/fx/CursorGlow.jsx'
import IntroBurst from './components/IntroBurst.jsx'
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
      <IntroBurst />
      <ScrollProgress />
      <ScrollToTop />
      <CursorGlow />
      <Grain />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Footer />
      <AssistantWidget />
    </MotionConfig>
  )
}
