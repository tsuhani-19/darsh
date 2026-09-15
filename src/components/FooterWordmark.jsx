import { site } from '../siteConfig.js'

/**
 * The name at display size across the foot of the page, set to fill the
 * column exactly — flush left and flush right, whatever the viewport.
 *
 * Drawn as SVG rather than styled text because `textLength` with
 * `lengthAdjust="spacingAndGlyphs"` is the only thing that makes a line span a
 * given width *exactly*. Tuning a `vw` font-size gets close at one breakpoint
 * and leaves a ragged gap at every other one, and it breaks outright if the
 * webfont fails and a fallback with different metrics steps in — here the line
 * still fills the space either way.
 *
 * The gradient is on the fill rather than in CSS for the same reason it was
 * before: the two brand materials have to melt through a warm blush in the
 * middle third, so that neither half ever reads as a flat block of colour
 * stacked on the other.
 */
export default function FooterWordmark() {
  return (
    <svg
      viewBox="0 0 1000 96"
      // `none` lets the box track the container width while the text inside is
      // already fitted to it, so nothing is letterboxed at any aspect.
      preserveAspectRatio="xMidYMid meet"
      className="block w-full select-none overflow-visible"
      role="img"
      aria-label={site.name}
    >
      <defs>
        {/* userSpaceOnUse, pinned to the cap-height band rather than the default
            bounding box: a text bbox is derived from font metrics, so an
            objectBoundingBox gradient lands somewhere different for every
            fallback font and can come out inverted. These are viewBox units. */}
        <linearGradient id="footer-wordmark" gradientUnits="userSpaceOnUse" x1="0" y1="11" x2="0" y2="88">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#ffffff" />
          <stop offset="0.44" stopColor="#ffe3e0" />
          <stop offset="0.56" stopColor="#ff8a7a" />
          <stop offset="0.68" stopColor="#f23a33" />
          <stop offset="0.82" stopColor="#e8161f" />
          <stop offset="1" stopColor="#b80a12" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="88"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fill="url(#footer-wordmark)"
        // 107 is close to the natural width of this string at this weight, so
        // textLength is only ever nudging it — a size far off would stretch the
        // glyphs visibly rather than just re-tracking them.
        fontSize="107"
        fontWeight="800"
        fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
      >
        {site.name}
      </text>
    </svg>
  )
}
