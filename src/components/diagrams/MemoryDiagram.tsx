import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const lines = [
  '# My Project',
  'Stack: React + Vite',
  'Never use: Inter font',
  'Always: squash & merge',
  'Current: building nav',
]

export function MemoryDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="340" height="140" viewBox="0 0 340 140" fill="none">
        {/* File card */}
        <rect x="50" y="10" width="140" height="110" rx="8"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
        {/* Dog-ear */}
        <path d="M 160 10 L 190 10 L 190 30 Z"
          fill="var(--border)" />
        <text x="120" y="28" textAnchor="middle" fontSize="9"
          fill="var(--ink-muted)" fontFamily="var(--font-mono)">CLAUDE.md</text>
        <line x1="50" y1="33" x2="190" y2="33" stroke="var(--border)" strokeWidth="0.8" />

        {lines.map((l, i) => (
          <motion.text key={i} x="60" y={48 + i * 14} fontSize="8"
            fill={i === 0 ? 'var(--accent-power)' : 'var(--ink-secondary)'}
            fontFamily="var(--font-mono)"
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
          >
            {l}
          </motion.text>
        ))}

        {/* Arrows showing persistence */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <text x="220" y="40" fontSize="8.5" fill="var(--ink-muted)" fontFamily="var(--font-body)">
            Session 1 →
          </text>
          <text x="220" y="58" fontSize="8.5" fill="var(--ink-muted)" fontFamily="var(--font-body)">
            Session 2 →
          </text>
          <text x="220" y="76" fontSize="8.5" fill="var(--ink-muted)" fontFamily="var(--font-body)">
            Session 3 →
          </text>
          <line x1="195" y1="62" x2="212" y2="62"
            stroke="var(--border)" strokeWidth="40" strokeOpacity="0.06" />
          <text x="260" y="100" textAnchor="middle" fontSize="8"
            fill="var(--accent-power)" fontFamily="var(--font-body)">context persists</text>
        </motion.g>
      </svg>
    </div>
  )
}
