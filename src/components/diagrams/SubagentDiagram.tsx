import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const children = [
  { label: 'Research\nagent', color: '#D4622A', y: 20 },
  { label: 'Code\nagent', color: '#2A6D8F', y: 65 },
  { label: 'Review\nagent', color: '#4A7C59', y: 110 },
]

export function SubagentDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="300" height="150" viewBox="0 0 300 150" fill="none">
        {/* Parent */}
        <rect x="10" y="55" width="90" height="40" rx="8"
          fill="var(--bg-card)" stroke="var(--ink-primary)" strokeWidth="1.5" />
        <text x="55" y="79" textAnchor="middle" fontSize="10"
          fill="var(--ink-primary)" fontFamily="var(--font-body)">Main agent</text>

        {children.map((c, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
          >
            <line x1="102" y1="75" x2="165" y2={c.y + 18}
              stroke={`${c.color}50`} strokeWidth="1.2" strokeDasharray="4 3" />
            <rect x="165" y={c.y} width="80" height="36" rx="7"
              fill={`${c.color}12`} stroke={c.color} strokeWidth="1.2" />
            {c.label.split('\n').map((line, li) => (
              <text key={li} x="205" y={c.y + 16 + li * 13} textAnchor="middle"
                fontSize="9" fill={c.color} fontFamily="var(--font-body)">{line}</text>
            ))}
          </motion.g>
        ))}

        <motion.text x="150" y="148" textAnchor="middle" fontSize="8"
          fill="var(--ink-muted)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}>parallel execution</motion.text>
      </svg>
    </div>
  )
}
