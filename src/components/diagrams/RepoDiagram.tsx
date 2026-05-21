import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const commits = ['init', 'add nav', 'fix bug', 'feature', 'polish', 'HEAD']

export function RepoDiagram() {
  const { inView } = useConceptContext()
  return (
    
      <svg width="360" height="100" viewBox="0 0 360 100" fill="none">
        {/* Timeline line */}
        <motion.line x1="30" y1="50" x2="340" y2="50"
          stroke="var(--accent-git)" strokeWidth="2"
          initial={{ scaleX: 0, originX: '0%' }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7 }}
        />

        {commits.map((label, i) => {
          const x = 30 + i * 54
          const isHead = label === 'HEAD'
          return (
            <motion.g key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
            >
              <circle cx={x} cy="50" r={isHead ? 9 : 6}
                fill={isHead ? 'var(--accent-git)' : 'var(--bg-card)'}
                stroke="var(--accent-git)" strokeWidth="1.5" />
              <text x={x} y={isHead ? 35 : 76} textAnchor="middle" fontSize="8"
                fill={isHead ? 'var(--accent-git)' : 'var(--ink-muted)'}
                fontFamily="var(--font-mono)">{label}</text>
            </motion.g>
          )
        })}
      </svg>
  )
}
