import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function HarnessDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="320" height="150" viewBox="0 0 320 150" fill="none">
        {/* Outer harness */}
        <motion.rect x="20" y="15" width="280" height="120" rx="12"
          fill="var(--bg-card)" stroke="var(--accent-agent)" strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
        <motion.text x="160" y="36" textAnchor="middle" fontSize="9"
          fill="var(--accent-agent)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          Harness (Claude Code Desktop)
        </motion.text>

        {/* Inner model */}
        <motion.rect x="110" y="50" width="100" height="50" rx="8"
          fill="var(--bg-base)" stroke="var(--ink-primary)" strokeWidth="1.5"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />
        <motion.text x="160" y="80" textAnchor="middle" fontSize="11"
          fill="var(--ink-primary)" fontFamily="var(--font-display)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        >
          Model
        </motion.text>

        {/* Surrounding labels */}
        {[
          { label: 'UI', x: 42, y: 78 },
          { label: 'Tools', x: 262, y: 78 },
          { label: 'Permissions', x: 160, y: 126 },
        ].map((l, i) => (
          <motion.text key={i} x={l.x} y={l.y} textAnchor="middle" fontSize="9"
            fill="var(--ink-muted)" fontFamily="var(--font-body)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {l.label}
          </motion.text>
        ))}
      </svg>
    </div>
  )
}
