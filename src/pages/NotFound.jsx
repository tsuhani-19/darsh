import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { MaskedHeading, Reveal } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="relative grid min-h-[75svh] place-items-center overflow-hidden px-6 pt-24">
        <div className="relative max-w-lg text-center">
          <p className="eyebrow">Error 404</p>
          <MaskedHeading
            as="h1"
            lines={['This page is not', 'where it used to be.']}
            className="mt-4 font-display text-[2.2rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-[3rem]"
          />
          <Reveal delay={0.25}>
            <p className="lede mt-5">
              The link may be old or slightly mistyped. Everything else is still where you left it.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <Link to="/" className="btn-primary mt-8">
              <ArrowLeft size={15} /> Back to home
            </Link>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
