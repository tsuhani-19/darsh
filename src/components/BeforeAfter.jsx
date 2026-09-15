import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'

/**
 * Drag-to-compare slider. Works with pointer drag, click-to-position and the
 * arrow keys, so it is usable on a phone and with a keyboard.
 */
export default function BeforeAfter({ before, after, beforeLabel = 'Before', afterLabel = 'After' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  useEffect(() => {
    const move = (e) => dragging.current && setFromClientX(e.clientX ?? e.touches?.[0]?.clientX)
    const up = () => {
      dragging.current = false
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [setFromClientX])

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true
        setFromClientX(e.clientX)
      }}
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-line bg-ink-100"
    >
      {/* after (full) */}
      <img src={after} alt={afterLabel} draggable={false} className="absolute inset-0 h-full w-full object-cover" />

      {/* before — clipped with clip-path so the image itself is never resized */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before}
          alt={beforeLabel}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/30 mix-blend-multiply" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink-900/75 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-900 backdrop-blur">
        {afterLabel}
      </span>

      {/* handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
        <motion.button
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
          }}
          aria-label="Drag to compare"
          className="pointer-events-auto absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-brand-600 text-white shadow-lift"
        >
          <MoveHorizontal size={18} />
        </motion.button>
      </div>
    </div>
  )
}
