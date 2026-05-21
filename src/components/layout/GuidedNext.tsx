import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Section } from '@/data/sections'

interface GuidedNextProps {
  next: Section
}

export function GuidedNext({ next }: GuidedNextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16 mb-12"
    >
      <Link
        to={`/section/${next.id}`}
        className="group flex items-center justify-between p-6 rounded-2xl transition-all hover:shadow-sm"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          textDecoration: 'none',
        }}
      >
        <div>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-1"
            style={{ color: 'var(--ink-muted)' }}
          >
            Up next
          </p>
          <p
            className="text-xl font-normal"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
          >
            {next.title}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-secondary)' }}>
            {next.description}
          </p>
        </div>
        <div
          className="text-2xl transition-transform group-hover:translate-x-1"
          style={{ color: next.accent }}
        >
          →
        </div>
      </Link>
    </motion.div>
  )
}
