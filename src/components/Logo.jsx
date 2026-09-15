import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../siteConfig.js'

/**
 * Brand mark on its own. Uses the official raster file once it exists in
 * /public, otherwise the bundled vector stand-in.
 */
export function LogoMark({ className = 'h-10 w-10' }) {
  const [src, setSrc] = useState(site.logoMark)
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      onError={() => src !== site.logoFallback && setSrc(site.logoFallback)}
      className={`${className} select-none object-contain`}
    />
  )
}

/** Wordmark set to match the official lockup, used when logo-full is absent. */
export function Wordmark({ dark = false, size = 'md' }) {
  const scale = size === 'sm' ? ['text-[1.15rem]', 'text-[0.78rem]'] : ['text-[1.4rem]', 'text-[0.95rem]']
  return (
    <span className="leading-[1.05]">
      <span
        className={`block font-display font-extrabold tracking-[-0.02em] ${scale[0]} ${
          dark ? 'text-white' : 'text-ink-900'
        }`}
      >
        Darsh
      </span>
      <span
        className={`block bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text font-display font-semibold tracking-[0.01em] text-transparent ${scale[1]}`}
      >
        Innovations
      </span>
    </span>
  )
}

/** Full lockup: the official image if present, otherwise mark + wordmark. */
export default function Logo({ className = 'h-10', dark = false, size = 'md' }) {
  const [broken, setBroken] = useState(false)

  return (
    <Link to="/" aria-label={`${site.name} — home`} className="flex items-center gap-2.5">
      {broken ? (
        <>
          <LogoMark className={size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'} />
          <Wordmark dark={dark} size={size} />
        </>
      ) : (
        <img
          src={site.logoFull}
          alt={site.name}
          draggable={false}
          onError={() => setBroken(true)}
          className={`${className} w-auto select-none object-contain`}
        />
      )}
    </Link>
  )
}
