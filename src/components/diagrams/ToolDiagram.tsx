import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const tools = [
  { label: 'Read file', color: '#4A7C59', y: 25 },
  { label: 'Write file', color: '#2A6D8F', y: 55 },
  { label: 'Fetch URL', color: '#8F6F2A', y: 85 },
  { label: 'Run code', color: '#7C4A8F', y: 115 },
]

export function ToolDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="320" height="150" viewBox="0 0 320 150" fill="none">
        <rect x="100" y="55" width="80" height="40" rx="8"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="140" y="80" textAnchor="middle" fontSize="11"
          fill="var(--ink-secondary)" fontFamily="var(--font-body)">Model</text>

        {tools.map((t, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.35 }}
          >
            <line x1="182" y1="75" x2="222" y2={t.y + 10}
              stroke={`${t.color}50`} strokeWidth="1" strokeDasharray="3 2" />
            <rect x="222" y={t.y} width="80" height="22" rx="5"
              fill={`${t.color}14`} stroke={t.color} strokeWidth="1" />
            <text x="262" y={t.y + 14} textAnchor="middle" fontSize="9"
              fill={t.color} fontFamily="var(--font-body)">{t.label}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
