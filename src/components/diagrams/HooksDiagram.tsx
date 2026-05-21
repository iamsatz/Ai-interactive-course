import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const hooks = [
  { event: 'on commit', action: 'run formatter', color: '#4A7C59' },
  { event: 'on tool use', action: 'log to file', color: '#2A6D8F' },
  { event: 'on stop', action: 'notify Slack', color: '#8F6F2A' },
]

export function HooksDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="340" height="130" viewBox="0 0 340 130" fill="none">
        {hooks.map((h, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.35 }}
          >
            {/* Event */}
            <rect x="10" y={18 + i * 38} width="100" height="26" rx="6"
              fill="var(--bg-card)" stroke={h.color} strokeWidth="1" />
            <text x="60" y={34 + i * 38} textAnchor="middle" fontSize="9"
              fill={h.color} fontFamily="var(--font-mono)">{h.event}</text>

            {/* Arrow */}
            <line x1="112" y1={31 + i * 38} x2="148" y2={31 + i * 38}
              stroke={`${h.color}60`} strokeWidth="1.2" strokeDasharray="3 2" />
            <polygon
              points={`147,${27 + i * 38} 155,${31 + i * 38} 147,${35 + i * 38}`}
              fill={`${h.color}60`} />

            {/* Action */}
            <rect x="157" y={18 + i * 38} width="100" height="26" rx="6"
              fill={`${h.color}12`} stroke={h.color} strokeWidth="1.2" />
            <text x="207" y={34 + i * 38} textAnchor="middle" fontSize="9"
              fill={h.color} fontFamily="var(--font-body)">{h.action}</text>

            {/* Auto tag */}
            <rect x="268" y={20 + i * 38} width="52" height="18" rx="4"
              fill={`${h.color}18`} />
            <text x="294" y={32 + i * 38} textAnchor="middle" fontSize="7.5"
              fill={h.color} fontFamily="var(--font-body)">automatic</text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
