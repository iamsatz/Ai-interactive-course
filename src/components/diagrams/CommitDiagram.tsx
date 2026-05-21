import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const commits = [
  { label: 'init project', msg: 'Setup complete' },
  { label: 'add hero', msg: 'Landing page' },
  { label: 'fix nav', msg: 'Bug fixed' },
  { label: 'v1.0 ★', msg: 'Ship it' },
]

export function CommitDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="360" height="110" viewBox="0 0 360 110" fill="none">
        <motion.line x1="20" y1="55" x2="340" y2="55"
          stroke="var(--border)" strokeWidth="1.5"
          initial={{ scaleX: 0, originX: '0%' }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
        />
        {commits.map((c, i) => {
          const x = 30 + i * 88
          const isLast = i === commits.length - 1
          return (
            <motion.g key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.35 }}
            >
              <circle cx={x} cy="55" r={isLast ? 10 : 7}
                fill={isLast ? 'var(--accent-git)' : 'var(--bg-card)'}
                stroke="var(--accent-git)" strokeWidth={isLast ? 2 : 1.5} />
              <text x={x} y={isLast ? 58 : 59} textAnchor="middle"
                fontSize={isLast ? "8" : "7"}
                fill={isLast ? 'white' : 'var(--accent-git)'}
                fontFamily="var(--font-mono)">{isLast ? '★' : (i + 1)}</text>
              <text x={x} y="80" textAnchor="middle" fontSize="7.5"
                fill="var(--ink-secondary)" fontFamily="var(--font-body)">{c.msg}</text>
              <text x={x} y="93" textAnchor="middle" fontSize="7"
                fill="var(--ink-muted)" fontFamily="var(--font-mono)">{c.label}</text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
