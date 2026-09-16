import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo.jsx'
import { site } from '../siteConfig.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-brand-500/20 bg-white/85 shadow-[0_1px_0_rgba(232,22,31,0.06),0_10px_30px_-24px_rgba(232,22,31,0.5)] backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="container-x flex h-[4.75rem] items-center justify-between gap-6">
          <Logo className="h-11 sm:h-14" />

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="group relative py-1 text-sm font-medium">
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-ink-900' : 'text-ink-500 transition-colors group-hover:text-ink-900'}>
                      {l.label}
                    </span>
                    {/* the rule wipes out from the left rather than fading, and
                        carries the logo's red-into-black sweep */}
                    <span
                      className={`bg-spectrum absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-dark hidden !px-5 !py-2.5 !text-[0.85rem] sm:inline-flex">
              Start a project
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-600 md:hidden"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white pt-[4.5rem] md:hidden"
          >
            <div className="container-x flex h-full flex-col pt-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.06, duration: 0.35 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-line py-5 font-display text-2xl font-semibold tracking-tight ${
                        isActive ? 'text-brand-500' : 'text-ink-900'
                      }`
                    }
                  >
                    {l.label}
                    <span className="text-brand-400">→</span>
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-3"
              >
                <Link to="/contact" className="btn-primary w-full">
                  Start a project
                </Link>
                <a href={site.phoneHref} className="btn-outline w-full">
                  <Phone size={15} /> Call us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
