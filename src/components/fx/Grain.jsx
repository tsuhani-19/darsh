/** Fixed film-grain wash over the whole page. Pure CSS, no repaint cost. */
export default function Grain() {
  return <div aria-hidden="true" className="grain-overlay" />
}
