import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Cursor treatment in two parts: a small hard dot with a lagging ring that
 * swells over anything clickable, and an ember plume that smoulders off the
 * pointer and drifts away like ash.
 *
 * The plume is drawn on a canvas rather than as DOM nodes. A chain of divs
 * always reads as a string of separate blobs — you can count them — where a
 * particle field that spawns along the *path* between two pointer samples and
 * fades on its own curve reads as one continuous body of smoke. It is also
 * cheaper: one composited layer instead of a dozen.
 *
 * Only mounted where a real pointer exists and motion is welcome — on touch,
 * or under `prefers-reduced-motion`, the native cursor is left completely
 * alone (including the `cursor: none` rule, which is applied from here).
 */

const MAX_PARTICLES = 260
const EMBER = [214, 18, 26] // the logo red, a touch down into its shaded range
const ASH = [96, 101, 109] // cooled graphite — reads as smoke, not as a smudge

/**
 * One soft blob, pre-rendered once. Building a radial gradient per particle
 * per frame is the expensive part of this effect; stamping a cached sprite is
 * close to free, so the whole field costs one drawImage each.
 */
function makeSprite([r, g, b]) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, `rgba(${r},${g},${b},0.52)`)
  grd.addColorStop(0.3, `rgba(${r},${g},${b},0.27)`)
  grd.addColorStop(0.64, `rgba(${r},${g},${b},0.085)`)
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, 128, 128)
  return c
}

function EmberTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const ember = makeSprite(EMBER)
    const ash = makeSprite(ASH)

    let w = 0
    let h = 0
    const resize = () => {
      // Cap the backing store at 2x. Beyond that the extra pixels are invisible
      // and the fill cost of a full-screen particle field is not.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const parts = []
    let last = null

    const spawn = (x, y, dx, dy) => {
      if (parts.length >= MAX_PARTICLES) return
      parts.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        // A fraction of the pointer's own velocity, so the plume streams out
        // behind a fast flick instead of sitting in a neat pile.
        vx: dx * 0.1 + (Math.random() - 0.5) * 0.9,
        vy: dy * 0.1 + (Math.random() - 0.5) * 0.9 - 0.14,
        r: 12 + Math.random() * 20,
        grow: 0.03 + Math.random() * 0.03,
        // Curl. Without it every particle flies straight and the plume is a
        // cone; a slow turn on each one is what makes it churn like smoke.
        ang: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        swirl: 0.05 + Math.random() * 0.13,
        life: 1,
        // A third to half a second. Long enough to draw a tail behind a moving
        // pointer, short enough that the plume is gone by the time the eye
        // comes back to read whatever was underneath it.
        decay: 0.03 + Math.random() * 0.022,
        // Close to half the field is burnt-out black. That mix is what reads as
        // ash rather than as a red glow following the pointer around.
        ash: Math.random() < 0.35,
      })
    }

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e
      if (last) {
        const dx = x - last.x
        const dy = y - last.y
        const dist = Math.hypot(dx, dy)
        // Spawn *along* the segment between samples. Pointer events arrive far
        // apart on a fast move; without this the plume comes out as islands.
        const steps = Math.max(1, Math.min(Math.ceil(dist / 7), 16))
        for (let s = 1; s <= steps; s++) {
          spawn(last.x + (dx * s) / steps, last.y + (dy * s) / steps, dx, dy)
        }
      }
      last = { x, y }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0
    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.life -= p.decay
        if (p.life <= 0) {
          parts.splice(i, 1)
          continue
        }
        p.ang += p.spin
        p.vx += Math.cos(p.ang) * p.swirl
        p.vy += Math.sin(p.ang) * p.swirl
        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.014 // keeps rising, the way smoke does
        p.vx *= 0.976
        p.vy *= 0.976
        p.r += p.r * p.grow
        // Fade in as well as out, so nothing pops into existence at full
        // strength right under the pointer.
        const a = Math.sin(p.life * Math.PI) * 0.22
        ctx.globalAlpha = p.ash ? a * 0.55 : a
        const sprite = p.ash ? ash : ember
        ctx.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2)
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[78]"
    />
  )
}

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 170, damping: 20, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 170, damping: 20, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const decide = () => setEnabled(fine.matches && !still.matches)
    decide()
    fine.addEventListener('change', decide)
    still.addEventListener('change', decide)
    return () => {
      fine.removeEventListener('change', decide)
      still.removeEventListener('change', decide)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target instanceof Element ? e.target : null
      setHot(!!el?.closest('a, button, [role="button"], input, textarea, select, label'))
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <EmberTrail />

      {/* The dot stays ink, not red — it has to stay findable on top of a red
          button and on top of its own plume. The hairline ring is what keeps
          it visible against the dark sections. */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[80] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-ink-900 ring-1 ring-white/70"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: down ? 0.8 : hot ? 2.1 : 1, opacity: hot ? 0.9 : 0.42 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[79] -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-brand-500/60"
      />
    </>
  )
}
