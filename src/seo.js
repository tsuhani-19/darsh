/* ---------------------------------------------------------------------------
   SEO

   One description of every public page, used in two places:
     - scripts/prerender.js writes it into each page's HTML at build time, so
       crawlers and link previews get the right title, canonical and
       structured data without running any JavaScript;
     - <RouteMeta> in App.jsx applies the same tags on client-side navigation.

   Add a page here and it gets prerendered and listed in the sitemap.
--------------------------------------------------------------------------- */

import { site } from './siteConfig.js'
import { servicePages } from './content/servicePages.js'
import { posts } from './content/posts.js'

export const SITE_URL = 'https://www.darshinnovations.in'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export const absolute = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)

const crumbs = (...trail) => [{ name: 'Home', path: '/' }, ...trail]

const staticPages = [
  {
    path: '/',
    title: 'Website & App Development in Mumbai | Darsh Innovations',
    description:
      'Websites, web and mobile apps and business automation for businesses in Vasai–Virar, Nalasopara and Mumbai, with the marketing and video around them.',
  },
  {
    path: '/about',
    title: 'About Darsh Innovations | Web, App & Marketing Studio',
    description:
      'A small digital studio that designs and builds websites and apps, and runs the marketing and video work around them, as one team.',
  },
  {
    path: '/services',
    title: 'Web, App, Automation & Marketing Services | Darsh Innovations',
    description:
      'Website development, web and mobile apps, business automation, digital marketing, video, branding and SEO from one team, with a fixed quote up front.',
  },
  {
    path: '/contact',
    title: 'Contact Darsh Innovations | Nalasopara, Vasai–Virar & Mumbai',
    description:
      'Tell us about your website, app or automation project. Send a short brief on WhatsApp or call, and we reply within one working day.',
  },
  {
    path: '/blog',
    title: 'Guides on Websites, Apps & Automation | Darsh Innovations',
    description:
      'Practical articles for small businesses on website costs, booking sites, CRMs, WhatsApp enquiries and choosing between a website and an app.',
    breadcrumbs: crumbs({ name: 'Blog', path: '/blog' }),
  },
]

const servicePageMeta = servicePages.map((s) => ({
  path: s.path,
  title: s.metaTitle,
  description: s.metaDescription,
  breadcrumbs: crumbs({ name: 'Services', path: '/services' }, { name: s.name, path: s.path }),
}))

const postMeta = posts.map((p) => ({
  path: `/blog/${p.slug}`,
  title: `${p.title} | Darsh Innovations`,
  description: p.description,
  type: 'article',
  post: p,
  breadcrumbs: crumbs({ name: 'Blog', path: '/blog' }, { name: p.title, path: `/blog/${p.slug}` }),
}))

/** Every indexable page, in sitemap order. */
export const pages = [...staticPages, ...servicePageMeta, ...postMeta]

export const notFoundMeta = {
  path: null,
  title: 'Page not found | Darsh Innovations',
  description: 'This page does not exist. Head back to the Darsh Innovations home page.',
  noindex: true,
}

export function metaFor(pathname) {
  // tolerate a trailing slash during client navigation; the host redirects it
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return pages.find((p) => p.path === clean) ?? notFoundMeta
}

/* ------------------------------ structured data ------------------------------ */

// Only confirmed details: name, URL, email and the areas the copy says we
// serve. Phone and address are added only when siteConfig.js has them, so the
// markup never states anything the page does not show. No ratings or reviews.
const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: site.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-512.png`,
  email: site.email,
  ...(site.phone && { telephone: site.phone.replace(/\s/g, '') }),
  ...(site.address && { address: { '@type': 'PostalAddress', streetAddress: site.address, addressCountry: 'IN' } }),
  areaServed: ['Vasai-Virar', 'Nalasopara', 'Mumbai', 'India'],
  sameAs: site.socials.map((s) => s.href).filter((h) => h && h !== '#'),
}

function jsonLd(meta) {
  const graph = []
  if (meta.path === '/') {
    graph.push(organization, {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: site.name,
      publisher: { '@id': organization['@id'] },
    })
  }
  if (meta.breadcrumbs) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: meta.breadcrumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: absolute(c.path),
      })),
    })
  }
  if (meta.post) {
    graph.push({
      '@type': 'BlogPosting',
      headline: meta.post.title,
      description: meta.post.description,
      datePublished: meta.post.date,
      dateModified: meta.post.updated ?? meta.post.date,
      mainEntityOfPage: absolute(meta.path),
      image: OG_IMAGE,
      author: { '@type': 'Organization', name: site.name, url: `${SITE_URL}/` },
      publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: OG_IMAGE } },
    })
  }
  if (!graph.length) return null
  return { '@context': 'https://schema.org', '@graph': graph.map(stripEmpty) }
}

// sameAs stays empty until real social profiles are filled in siteConfig.js
function stripEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => !(Array.isArray(v) && v.length === 0)))
}

/* --------------------------------- head tags --------------------------------- */

/**
 * The page-specific head, as plain descriptors so the prerenderer can print
 * them and the client can apply them. `key` is how the client finds the tag
 * it wrote last time.
 */
export function headTags(meta) {
  const url = meta.path ? absolute(meta.path) : null
  const tags = [
    { key: 'description', tag: 'meta', attrs: { name: 'description', content: meta.description } },
    { key: 'robots', tag: 'meta', attrs: { name: 'robots', content: meta.noindex ? 'noindex' : 'index, follow' } },
    { key: 'og:type', tag: 'meta', attrs: { property: 'og:type', content: meta.type ?? 'website' } },
    { key: 'og:title', tag: 'meta', attrs: { property: 'og:title', content: meta.title } },
    { key: 'og:description', tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { key: 'og:image', tag: 'meta', attrs: { property: 'og:image', content: OG_IMAGE } },
    { key: 'og:image:width', tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { key: 'og:image:height', tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { key: 'og:image:alt', tag: 'meta', attrs: { property: 'og:image:alt', content: `${site.name} logo` } },
    { key: 'twitter:title', tag: 'meta', attrs: { name: 'twitter:title', content: meta.title } },
    { key: 'twitter:description', tag: 'meta', attrs: { name: 'twitter:description', content: meta.description } },
    { key: 'twitter:image', tag: 'meta', attrs: { name: 'twitter:image', content: OG_IMAGE } },
  ]
  if (url) {
    tags.push(
      { key: 'canonical', tag: 'link', attrs: { rel: 'canonical', href: url } },
      { key: 'og:url', tag: 'meta', attrs: { property: 'og:url', content: url } },
    )
  }
  const ld = jsonLd(meta)
  if (ld) tags.push({ key: 'ld', tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(ld) })
  return tags
}
