import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import logoOnInk from '../assets/logo-on-ink.png'
import FooterWordmark from './FooterWordmark.jsx'
import { Reveal } from './ui.jsx'
import { site, whatsappLink } from '../siteConfig.js'
import { services } from '../data.js'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-ink-300">
      <div className="bg-spectrum h-[3px] w-full" />
      {/* Ember bloom under the oversized wordmark, so the red half of the word
          looks lit from behind rather than pasted onto flat ink. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-[32rem] w-[32rem] rounded-full bg-brand-600/20 blur-[120px]"
      />
      <div className="container-x relative py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
          <Reveal className="col-span-2 lg:col-span-1">
            {/* A version of the official artwork knocked out for ink: the
                near-white ground is transparent and the wordmark's black ink
                is light, so the lockup needs no plate behind it here. The
                palette was rebuilt from the same file, so the red is the
                brand red and the anti-aliasing stays clean. */}
            <img
              src={logoOnInk}
              alt={site.name}
              draggable={false}
              className="h-14 w-auto select-none object-contain"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              A digital studio in Mumbai. Design, engineering, marketing and video in one
              place, so the work stays consistent from the first sketch to launch day.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {site.socials
                .filter((s) => s.href && s.href !== '#')
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-400 transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">Pages</h3>
            <ul className="mt-4 text-sm sm:mt-5 sm:space-y-3">
              {[['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Contact', '/contact']].map(
                ([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="inline-flex min-h-[2.75rem] items-center sm:min-h-[1.5rem] text-ink-400 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">Services</h3>
            <ul className="mt-4 text-sm sm:mt-5 sm:space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to="/services" className="inline-flex min-h-[2.75rem] items-center sm:min-h-[1.5rem] text-ink-400 transition-colors hover:text-white">
                    {s.title.split(' &')[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.18} className="col-span-2 lg:col-span-1">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">Get in touch</h3>
            <ul className="mt-4 space-y-1 text-sm sm:mt-5 sm:space-y-4">
              <li>
                <a href={site.phoneHref} className="flex min-h-[2.75rem] items-center sm:min-h-[1.5rem] gap-3 text-ink-400 transition-colors hover:text-white">
                  <Phone size={15} className="text-steel-300" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex min-h-[2.75rem] items-center sm:min-h-[1.5rem] gap-3 break-all text-ink-400 transition-colors hover:text-white">
                  <Mail size={15} className="text-brand-300" /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ink-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-crimson-300" /> {site.address}
              </li>
            </ul>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-light mt-6 !px-5 !py-2.5 !text-[0.85rem]">
              Message on WhatsApp
            </a>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.hours}</p>
        </div>
      </div>

      {/* The wordmark at display size, right-aligned and bled past the bottom
          edge. Decorative — the real name is already in the lockup above and
          in the copyright line, so this is hidden from assistive tech rather
          than read out a third time. */}
      <div aria-hidden="true" className="container-x pointer-events-none relative -mt-6 pb-24 sm:-mt-8 sm:pb-10">
        <Reveal margin="0px">
          <FooterWordmark />
        </Reveal>
      </div>
    </footer>
  )
}
