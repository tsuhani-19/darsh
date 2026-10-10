import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AssistantWidget from './components/AssistantWidget.jsx'
import CursorGlow from './components/fx/CursorGlow.jsx'
import IntroLoader from './components/IntroLoader.jsx'
import Grain from './components/fx/Grain.jsx'
import { ScrollProgress } from './components/ui.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import ServicePage from './pages/ServicePage.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import { servicePages } from './content/servicePages.js'
import { headTags, metaFor } from './seo.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* Keeps the head in step with the route after client-side navigation. The
   first load already has the right tags baked in by scripts/prerender.js;
   this replaces them in place using the same descriptors. */
function RouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    const head = document.head
    head.querySelectorAll('[data-route-meta]').forEach((el) => el.remove())
    for (const t of headTags(meta)) {
      // drop any static copy of the same tag left in index.html
      if (t.key === 'description' || t.key === 'robots') head.querySelector(`meta[name="${t.key}"]`)?.remove()
      const el = document.createElement(t.tag)
      for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v)
      if (t.text) el.textContent = t.text
      el.setAttribute('data-route-meta', '')
      head.appendChild(el)
    }
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
      <RouteMeta />
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
            {servicePages.map((page) => (
              <Route key={page.path} path={page.path} element={<ServicePage page={page} />} />
            ))}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <AssistantWidget />
    </MotionConfig>
  )
}
