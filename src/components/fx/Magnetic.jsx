import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Pulls its child toward the pointer and lets it snap back. Wraps in an
 * inline-flex span so a button keeps its own shape and sizing.
 *
 * Touch devices never fire the move handler, so nothing is lost there.
 */
export default function Magnetic({ children, strength = 0.32, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 260, damping: 16, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.span>
  )
}
