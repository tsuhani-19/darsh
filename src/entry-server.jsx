// Build-time entry used only by scripts/prerender.js. Renders a route to HTML
// so every public page ships its real headings, copy and links in the initial
// response, instead of an empty <div id="root">.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

export { pages, notFoundMeta, headTags, absolute } from './seo.js'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
