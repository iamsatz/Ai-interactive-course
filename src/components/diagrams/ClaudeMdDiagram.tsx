import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const sections = [
  { heading: '# Project',     body: 'Design portfolio site.' },
  { heading: '# Stack',       body: 'Next.js 14, Tailwind, Sanity CMS.' },
  { heading: '# File layout', body: '/app, /components, /content (markdown).' },
  { heading: '# Never',       body: 'Edit content/* directly. Use CMS.' },
]

export function ClaudeMdDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-[440px]">
        {/* File pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="flex items-center gap-2 mb-2"
        >
          <span
            className="text-[11px] px-2 py-0.5 rounded"
            style={{
              background: `var(--accent-power)14`,
              color: 'var(--accent-power)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            CLAUDE.md
          </span>
          <span
            className="text-[10px]"
            style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
          >
            project root
          </span>
        </motion.div>

        {/* File body */}
        <div
          className="rounded-lg p-4 space-y-3"
          style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--accent-power)',
          }}
        >
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.25 }}
            >
              <p
                className="text-[12px] mb-0.5"
                style={{
                  color: 'var(--accent-power)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                {s.heading}
              </p>
              <p
                className="text-[12px]"
                style={{
                  color: 'var(--ink-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Arrow + Claude box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3 mt-3"
        >
          <span
            className="text-[11px]"
            style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
          >
            read at session start
          </span>
          <span style={{ color: 'var(--accent-power)' }}>→</span>
          <div
            className="px-3 py-1.5 rounded-md text-xs font-medium"
            style={{
              background: 'var(--ink-primary)',
              color: 'var(--bg-base)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Claude
          </div>
        </motion.div>
      </div>
    </div>
  )
}
