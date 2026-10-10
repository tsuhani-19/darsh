import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import { Reveal } from '../components/ui.jsx'
import { CTA } from './Home.jsx'
import { posts } from '../content/posts.js'
import { metaFor } from '../seo.js'

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Blog() {
  return (
    <PageTransition>
      <PageHero
        breadcrumbs={metaFor('/blog').breadcrumbs}
        lines={['Straight answers for', 'small businesses.']}
        subtitle="Short, practical guides on websites, apps, CRMs and WhatsApp: the questions we hear most on first calls."
      />

      <section className="py-16 sm:py-20">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <li className="h-full">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="card group flex h-full flex-col hover:border-ink-300 hover:shadow-lift"
                  >
                    <time dateTime={p.date} className="text-[0.75rem] uppercase tracking-[0.14em] text-ink-400">
                      {formatDate(p.date)}
                    </time>
                    <h2 className="mt-3 font-display text-[1.25rem] font-bold leading-snug tracking-tight text-ink-900">
                      {p.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-500">{p.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink-900">
                      Read the guide
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </PageTransition>
  )
}
