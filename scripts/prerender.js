/* ---------------------------------------------------------------------------
   Static prerender, run after both Vite builds (see "build" in package.json).

   For every page in src/seo.js it writes dist/<path>.html containing the
   rendered markup plus that page's title, description, canonical, Open Graph
   and JSON-LD. It also writes dist/404.html (served by Vercel with a real 404
   status for unknown URLs) and dist/sitemap.xml.

   The browser still starts the app with createRoot, so the prerendered markup
   is replaced by the live app on load — the animations behave exactly as
   before; the HTML is there for crawlers, link previews and first paint.
--------------------------------------------------------------------------- */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, pages, notFoundMeta, headTags, absolute } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}`)
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function serializeHead(meta) {
  return headTags(meta)
    .map(({ tag, attrs, text }) => {
      const a = Object.entries(attrs)
        .map(([k, v]) => ` ${k}="${esc(v)}"`)
        .join('')
      // `<` inside JSON-LD is escaped so a string can never close the script tag
      if (tag === 'script') return `<script${a} data-route-meta>${text.replace(/</g, '\\u003c')}</script>`
      return `<${tag}${a} data-route-meta />`
    })
    .join('\n    ')
}

function page(meta, url) {
  const html = render(url)
  if (!/<h1[\s>]/.test(html)) throw new Error(`${url} rendered without an <h1>`)
  // a page listed in src/seo.js with no matching <Route> renders the 404 view;
  // fail the build rather than ship it with a 200 and a sitemap entry
  const is404 = html.includes('Error 404')
  if (is404 !== Boolean(meta.noindex)) throw new Error(`${url}: route and src/seo.js disagree about whether it exists`)
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace('<!--app-head-->', serializeHead(meta))
    .replace('<!--app-html-->', html)
}

function write(file, contents) {
  const out = path.join(dist, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, contents)
}

for (const meta of pages) {
  // "/" -> index.html, "/about" -> about.html, "/blog/x" -> blog/x.html;
  // vercel.json's cleanUrls serves them without the extension
  write(meta.path === '/' ? 'index.html' : `${meta.path.slice(1)}.html`, page(meta, meta.path))
}
write('404.html', page(notFoundMeta, '/404-not-found'))

// only indexable pages: the 404 page is not in `pages`, and nothing noindex may slip in
const urls = pages
  .filter((p) => !p.noindex)
  .map((p) => {
    const lastmod = p.post ? `\n    <lastmod>${p.post.updated ?? p.post.date}</lastmod>` : ''
    return `  <url>\n    <loc>${absolute(p.path)}</loc>${lastmod}\n  </url>`
  })
  .join('\n')
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${pages.length} pages + 404.html, sitemap.xml with ${pages.length} URLs`)
