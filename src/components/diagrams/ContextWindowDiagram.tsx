import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function ContextWindowDiagram() {
  const { inView } = useConceptContext()

  const rows = [
    { label: 'System prompt', color: '#4A7C59', width: 140 },
    { label: 'User message 1', color: '#2A6D8F', width: 120 },
    { label: 'Response 1', color: '#2A6D8F', width: 160 },
    { label: 'User message 2', color: '#2A6D8F', width: 100 },
    { label: 'Response 2', color: '#2A6D8F', width: 180 },
    { label: '⚠ older messages fade…', color: '#D4622A', width: 170, faded: true },
  ]

  return (
    <div className="my-6 flex justify-center">
      <svg width="380" height="180" viewBox="0 0 380 180" fill="none">
        {/* Container */}
        <rect x="20" y="10" width="240" height="160" rx="10"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />

        {/* Fill level overlay */}
        <motion.rect
          x="20" y="10" width="240" rx="10"
          fill="var(--accent-llm)" opacity="0.06"
          initial={{ height: 0 }}
          animate={inView ? { height: 160 } : { height: 0 }}
          transition={{ delay: 0.3, duration: 1.0, ease: 'easeOut' }}
        />

        {/* Context label */}
        <text x="140" y="8" textAnchor="middle" fontSize="9"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">
          Context window
        </text>

        {/* Token rows */}
        {rows.map((row, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: row.faded ? 0.35 : 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.35 }}
          >
            <rect
              x={30} y={24 + i * 23} width={row.width} height={16} rx={4}
              fill={`${row.color}20`} stroke={row.color} strokeWidth="0.8"
            />
            <text
              x={36} y={36 + i * 23} fontSize="8"
              fill={row.color} fontFamily="var(--font-body)"
            >
              {row.label}
            </text>
          </motion.g>
        ))}

        {/* Size indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          <rect x="280" y="40" width="85" height="60" rx="8"
            fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="323" y="62" textAnchor="middle" fontSize="9"
            fill="var(--ink-muted)" fontFamily="var(--font-body)">
            ~200k tokens
          </text>
          <text x="323" y="76" textAnchor="middle" fontSize="8"
            fill="var(--ink-muted)" fontFamily="var(--font-body)">
            ≈ a short novel
          </text>
          <text x="323" y="90" textAnchor="middle" fontSize="8"
            fill="var(--accent-llm)" fontFamily="var(--font-body)">
            fills → things drop
          </text>
        </motion.g>
      </svg>
    </div>
  )
}
