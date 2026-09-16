import { Link } from 'react-router-dom'
import { site } from '../siteConfig.js'

/**
 * Every appearance of the Darsh Innovations logo on the site comes from here,
 * and every one of them draws the one official file: public/logo.svg. Nothing
 * redraws, recolours or re-letters the artwork.
 *
 * The official file is the full lockup — the swirl mark with "Darsh
 * Innovations" beside it — 1618 x 971. Some slots (an avatar, a watermark, a
 * favicon) are square and want the mark on its own, so <LogoMark> shows the
 * same file through a square window over the mark rather than a second,
 * separately drawn asset. Crop values are measured off the artwork below.
 */

// Artwork geometry, in the units of logo.svg's own viewBox.
const ART = { w: 1618, h: 971 }
// The square around the swirl mark: the mark inks x 112-593, y 200-716, so
// this is that box centred with a little air around it.
const MARK = { x: 72, y: 178, size: 560 }

// The ground the artwork is drawn on. Not transparent — matching a plate to it
// is what keeps the logo from reading as a pasted-on white box over dark ink.
export const LOGO_PAPER = '#fdfdfd'

/** The mark on its own: the official file, windowed to the mark's square. */
export function LogoMark({ className = 'h-10 w-10', title }) {
  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      <img
        src={site.logo}
        alt=""
        draggable={false}
        // Width alone — height stays auto, so the artwork keeps its proportions
        // and the square window simply shows less of it.
        style={{
          width: `${(ART.w / MARK.size) * 100}%`,
          left: `${(-MARK.x / MARK.size) * 100}%`,
          top: `${(-MARK.y / MARK.size) * 100}%`,
        }}
        className="absolute max-w-none select-none"
      />
    </span>
  )
}

/** The full lockup as published, unlinked. Height is set, width follows. */
export function LogoLockup({ className = 'h-10' }) {
  return (
    <img
      src={site.logo}
      alt={site.name}
      draggable={false}
      className={`${className} w-auto select-none object-contain`}
    />
  )
}

/**
 * The lockup as the home link — the navbar and anywhere else it clicks.
 *
 * On its own paper, rounded. Over white the plate is invisible; over the
 * header's frosted panel, when that panel is sitting on a dark section, it is
 * what keeps the artwork's ground from reading as a hard white box cut into
 * the bar.
 */
export default function Logo({ className = 'h-10' }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className="inline-flex items-center rounded-lg px-2 py-1"
      style={{ backgroundColor: LOGO_PAPER }}
    >
      <LogoLockup className={className} />
    </Link>
  )
}
