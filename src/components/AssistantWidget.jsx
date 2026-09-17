import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, X, MessageCircle, PhoneCall } from 'lucide-react'
import { site, whatsappLink } from '../siteConfig.js'
import { LogoMark } from './Logo.jsx'

const SCRIPT = [
  'Hi — thanks for stopping by.',
  'Website, app, marketing or video: ask us anything and you will get a straight answer.',
  'How would you like to talk?',
]

/** Types the script out one character at a time once the panel opens. */
function useTypewriter(lines, active) {
  const [rendered, setRendered] = useState([])
  const [typing, setTyping] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (!active) {
      setRendered([])
      setTyping(false)
      return
    }

    setRendered([])
    setTyping(true)
    let delay = 350

    lines.forEach((line, li) => {
      timers.current.push(setTimeout(() => setRendered((p) => [...p, '']), delay))
      delay += 380
      for (let c = 1; c <= line.length; c += 1) {
        timers.current.push(
          setTimeout(() => {
            setRendered((p) => {
              const next = [...p]
              next[li] = line.slice(0, c)
              return next
            })
          }, delay),
        )
        delay += 15
      }
      delay += 260
    })

    timers.current.push(setTimeout(() => setTyping(false), delay))
    return () => timers.current.forEach(clearTimeout)
  }, [lines, active])

  return { rendered, typing }
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [tease, setTease] = useState(false)
  const { rendered, typing } = useTypewriter(SCRIPT, open)
  const done = !typing && rendered.length === SCRIPT.length

  useEffect(() => {
    const a = setTimeout(() => setTease(true), 6000)
    const b = setTimeout(() => setTease(false), 14000)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            role="dialog"
            aria-label={`Talk to ${site.name}`}
            className="w-[min(21.5rem,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl border border-line bg-white shadow-deep"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <div className="relative">
                <LogoMark className="h-8 w-8" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-steel-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[0.9rem] font-bold text-ink-900">Darsh Assistant</p>
                <p className="text-[0.7rem] text-steel-600">{site.hours}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full text-ink-400 transition-colors hover:bg-mist hover:text-ink-800"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[13rem] space-y-2 overflow-y-auto bg-mist px-4 py-4">
              {rendered.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="max-w-[93%] rounded-2xl rounded-tl-md border border-line bg-white px-3.5 py-2.5 text-[0.83rem] leading-relaxed text-ink-700">
                    {line || <TypingDots />}
                    {line && typing && i === rendered.length - 1 && (
                      <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-blink bg-brand-600 align-middle" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 border-t border-line p-3"
                >
                  <motion.a
                    href={site.phoneHref}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 }}
                    className="group flex items-center gap-3 rounded-xl border border-line px-3.5 py-3 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white">
                      <PhoneCall size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[0.85rem] font-semibold text-ink-900">Talk on a call</span>
                      <span className="block text-[0.72rem] text-ink-400">{site.phone}</span>
                    </span>
                    <span className="text-ink-300 transition-transform group-hover:translate-x-0.5">→</span>
                  </motion.a>

                  <motion.a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="group flex items-center gap-3 rounded-xl border border-line px-3.5 py-3 transition-colors hover:border-steel-300 hover:bg-steel-50"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-steel-500 text-white">
                      <MessageCircle size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[0.85rem] font-semibold text-ink-900">Chat on WhatsApp</span>
                      <span className="block text-[0.72rem] text-ink-400">Often the quickest way to reach us</span>
                    </span>
                    <span className="text-ink-300 transition-transform group-hover:translate-x-0.5">→</span>
                  </motion.a>

                  <p className="pt-1 text-center text-[0.68rem] text-ink-400">{site.hours}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2.5">
        <AnimatePresence>
          {tease && !open && (
            <motion.button
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              onClick={() => setOpen(true)}
              className="hidden rounded-xl rounded-br-sm border border-line bg-white px-3.5 py-2.5 text-[0.82rem] text-ink-700 shadow-lift sm:block"
            >
              Any questions? Talk to us
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close contact assistant' : 'Open contact assistant'}
          aria-expanded={open}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white shadow-deep"
        >
          {!open && <span className="absolute inset-0 animate-ring rounded-full bg-brand-500" />}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="relative">
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="p" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
                <Phone size={21} fill="currentColor" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-300"
          animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}
