import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const lines = [
  { text: '  const name = "World"', type: 'removed' },
  { text: '  const name = "Claude"', type: 'added' },
  { text: '  return <h1>Hello, {name}</h1>', type: 'context' },
  { text: '  return <h1>Hello, {name}!</h1>', type: 'added' },
  { text: '  return <h1>Hello, {name}</h1>', type: 'removed' },
]

export function DiffDiagram() {
  const { inView } = useConceptContext()
  return (
    
      <svg width="360" height="120" viewBox="0 0 360 120" fill="none">
        <rect x="20" y="10" width="320" height="100" rx="8"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="32" y="28" fontSize="9" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
          App.tsx — diff
        </text>
        <line x1="20" y1="33" x2="340" y2="33" stroke="var(--border)" strokeWidth="0.8" />

        {lines.map((l, i) => {
          const bg = l.type === 'added' ? '#4A7C590d' : l.type === 'removed' ? '#D4622A0d' : 'transparent'
          const prefix = l.type === 'added' ? '+' : l.type === 'removed' ? '−' : ' '
          const color = l.type === 'added' ? '#4A7C59' : l.type === 'removed' ? '#D4622A' : 'var(--ink-muted)'

          return (
            <motion.g key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
            >
              <rect x="20" y={37 + i * 16} width="320" height="16" fill={bg} />
              <text x="30" y={50 + i * 16} fontSize="8.5" fontFamily="var(--font-mono)" fill={color}>
                {prefix} {l.text}
              </text>
            </motion.g>
          )
        })}
      </svg>
  )
}
