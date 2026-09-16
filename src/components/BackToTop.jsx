import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

/* A 36px circle; the ring is drawn on its own radius so the stroke sits
   inside the button rather than straddling its edge. */
const R = 16
const C = 2 * Math.PI * R

/**
 * Return to the top, with the page's own progress drawn around it.
 *
 * Sits bottom-left so it never fights the assistant widget in the opposite
 * corner, and only appears once there is enough page behind you for it to be
 * worth offering.
 */
export default function BackToTop() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const dashoffset = useTransform(progress, (p) => C * (1 - p))
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          // `smooth` here rather than relying on html{scroll-behavior}, so the
          // behaviour is the same whichever way the page got its scroll
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.85 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 left-5 z-[70] grid h-11 w-11 place-items-center rounded-full border border-line bg-white/90 text-ink-700 shadow-soft backdrop-blur transition-colors hover:border-brand-300 hover:text-brand-600 sm:bottom-7 sm:left-7"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 36 36"
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          >
            <motion.circle
              cx="18"
              cy="18"
              r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={C}
              style={{ strokeDashoffset: dashoffset }}
              className="text-brand-500"
            />
          </svg>
          <ArrowUp size={17} className="relative transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
