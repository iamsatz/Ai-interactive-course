import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const tokens = [
  { text: 'Straw', color: '#D4622A', delay: 0.2 },
  { text: 'ber', color: '#2A6D8F', delay: 0.4 },
  { text: 'ry', color: '#4A7C59', delay: 0.6 },
]

export function TokenDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="my-6 flex justify-center">
      <svg width="380" height="120" viewBox="0 0 380 120" fill="none">
        {/* Original word */}
        <motion.text
          x="80" y="50" textAnchor="middle" fontSize="22"
          fontFamily="var(--font-display)" fill="var(--ink-primary)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          Strawberry
        </motion.text>

        {/* Split arrow */}
        <motion.path
          d="M80 60 L80 75 L160 90 M80 75 L20 90"
          stroke="var(--border)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        {/* Token chips */}
        {tokens.map((t, i) => (
          <motion.g key={t.text}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: t.delay + 0.4, duration: 0.35 }}
          >
            <rect
              x={10 + i * 60} y={92}
              width={50} height={22} rx={5}
              fill={`${t.color}18`} stroke={t.color} strokeWidth="1.2"
            />
            <text
              x={35 + i * 60} y={107} textAnchor="middle"
              fontSize="10" fill={t.color} fontFamily="var(--font-mono)"
            >
              {t.text}
            </text>
          </motion.g>
        ))}

        {/* Count badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 1.0, duration: 0.3 }}
        >
          <rect x="230" y="35" width="130" height="50" rx="8"
            fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="295" y="57" textAnchor="middle" fontSize="10"
            fill="var(--ink-muted)" fontFamily="var(--font-body)">
            3 tokens
          </text>
          <text x="295" y="75" textAnchor="middle" fontSize="9"
            fill="var(--ink-muted)" fontFamily="var(--font-body)">
            ≈ 1 word = ~1.3 tokens
          </text>
        </motion.g>
      </svg>
    </div>
  )
}
