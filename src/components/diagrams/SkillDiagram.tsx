import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const steps = ['Read CLAUDE.md', 'Check branch', 'Plan changes', 'Implement', 'Review diff']

export function SkillDiagram() {
  const { inView } = useConceptContext()
  return (
    
      <svg width="360" height="140" viewBox="0 0 360 140" fill="none">
        {/* Skill box */}
        <motion.rect x="10" y="50" width="90" height="40" rx="8"
          fill="var(--bg-card)" stroke="var(--accent-claude)" strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
        <text x="55" y="68" textAnchor="middle" fontSize="8"
          fill="var(--accent-claude)" fontFamily="var(--font-mono)">/start</text>
        <text x="55" y="80" textAnchor="middle" fontSize="7.5"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">Skill trigger</text>

        {/* Arrow */}
        <motion.line x1="102" y1="70" x2="125" y2="70"
          stroke="var(--border)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        />

        {/* Steps */}
        {steps.map((s, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.3 }}
          >
            <rect x={128 + i * 46} y="55" width="40" height="30" rx="5"
              fill={`var(--accent-claude)14`} stroke="var(--accent-claude)" strokeWidth="1" />
            <text x={148 + i * 46} y={68} textAnchor="middle" fontSize="7"
              fill="var(--accent-claude)" fontFamily="var(--font-body)">
              {s.split(' ')[0]}
            </text>
            <text x={148 + i * 46} y={79} textAnchor="middle" fontSize="7"
              fill="var(--accent-claude)" fontFamily="var(--font-body)">
              {s.split(' ').slice(1).join(' ')}
            </text>
            {i < steps.length - 1 && (
              <polygon points={`${168 + i * 46},70 ${175 + i * 46},70 ${171 + i * 46},74`}
                fill="var(--border)" />
            )}
          </motion.g>
        ))}
      </svg>
  )
}
