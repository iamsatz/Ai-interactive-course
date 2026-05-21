import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const nodes = [
  { label: 'Look', x: 155, y: 20 },
  { label: 'Decide', x: 265, y: 75 },
  { label: 'Act', x: 155, y: 130 },
  { label: 'Review', x: 45, y: 75 },
]

export function AgentLoopDiagram() {
  const { inView } = useConceptContext()
  return (
    
      <svg width="320" height="160" viewBox="0 0 320 160" fill="none">
        {/* Circular path */}
        <motion.circle cx="160" cy="80" r="70" stroke="var(--border)"
          strokeWidth="1.5" strokeDasharray="5 4" fill="none"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {nodes.map((n, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.35 }}
          >
            <rect x={n.x - 28} y={n.y - 14} width="56" height="28" rx="6"
              fill="var(--bg-card)" stroke="var(--accent-agent)" strokeWidth="1.2" />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="11"
              fill="var(--accent-agent)" fontFamily="var(--font-body)" fontWeight="500">
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* Rotation arrow */}
        <motion.path
          d="M 160 148 A 68 68 0 0 0 228 115"
          stroke="var(--accent-agent)" strokeWidth="2" fill="none"
          markerEnd="url(#arr)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill="var(--accent-agent)" />
          </marker>
        </defs>
      </svg>
  )
}
