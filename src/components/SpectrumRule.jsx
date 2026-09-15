import { motion } from 'framer-motion'

/** A hairline in the logo's gradient that draws itself across on scroll. */
export default function SpectrumRule({ className = '' }) {
  return (
    <div className={`relative h-[3px] w-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-spectrum h-full w-full origin-left"
      />
    </div>
  )
}
