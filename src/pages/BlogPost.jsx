import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import PageTransition from '../components/PageTransition.jsx'
import PageHero from '../components/PageHero.jsx'
import { CTA } from './Home.jsx'
import NotFound from './NotFound.jsx'
import { postBySlug } from '../content/posts.js'
import { servicePages } from '../content/servicePages.js'
import { metaFor } from '../seo.js'
import { formatDate } from './Blog.jsx'

export default function BlogPost() {
  const { slug } = useParams()
  const post = postBySlug(slug)
  if (!post) return <NotFound />

  const services = post.services.map((path) => servicePages.find((s) => s.path === path)).filter(Boolean)

  return (
    <PageTransition>
      <PageHero
        breadcrumbs={metaFor(`/blog/${post.slug}`).breadcrumbs}
        lines={[post.title]}
        subtitle={post.description}
      />

      <article className="py-14 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl">
            <p className="text-[0.8rem] text-ink-400">
              Published <time dateTime={post.date}>{formatDate(post.date)}</time> by Darsh Innovations
            </p>
            <div className="mt-8 space-y-5 text-[1rem] leading-[1.75] text-ink-600">
              {post.body.map((block, i) => (
                <Block key={i} {...block} />
              ))}
            </div>

            {services.length > 0 && (
              <aside className="mt-12 rounded-2xl border border-line bg-mist p-6 sm:p-8">
                <h2 className="font-display text-[1.1rem] font-semibold text-ink-900">Related services</h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {services.map((s) => (
                    <li key={s.path}>
                      <Link to={s.path} className="btn-outline !py-2.5 !text-[0.85rem]">
                        {s.name} <ArrowRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <p className="mt-10">
              <Link to="/blog" className="link-wipe text-[0.9rem]">
                ← All guides
              </Link>
            </p>
          </div>
        </div>
      </article>

      <CTA />
    </PageTransition>
  )
}

function Inline({ content }) {
  if (typeof content === 'string') return content
  return content.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : (
      <Link key={i} to={part.to} className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600">
        {part.label}
      </Link>
    ),
  )
}

function Block({ h2, p, ul, ol }) {
  if (h2) return <h2 className="!mt-10 font-display text-[1.4rem] font-bold leading-snug tracking-tight text-ink-900">{h2}</h2>
  if (p) return <p><Inline content={p} /></p>
  const items = ul ?? ol
  const List = ul ? 'ul' : 'ol'
  return (
    <List className={`space-y-2 pl-5 ${ul ? 'list-disc' : 'list-decimal'} marker:text-ink-400`}>
      {items.map((it) => (
        <li key={it} className="pl-1">{it}</li>
      ))}
    </List>
  )
}
