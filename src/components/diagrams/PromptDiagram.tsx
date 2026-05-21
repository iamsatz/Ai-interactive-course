import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function PromptDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="my-6 flex justify-center">
      <svg width="420" height="120" viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Input box */}
        <rect x="10" y="30" width="140" height="60" rx="8"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="80" y="57" textAnchor="middle" fontSize="10" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
          Your prompt
        </text>

        {/* Animated cursor blinking in input */}
        <motion.rect
          x="52" y="62" width="8" height="1.5"
          fill="var(--ink-primary)"
          animate={inView ? { opacity: [1, 0, 1] } : { opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}
        />

        {/* Animated text lines */}
        {[0, 1, 2].map(i => (
          <motion.rect
            key={i}
            x="24" y={64 + i * 0} width={60 + i * 20} height="1.5"
            rx="1" fill="var(--ink-muted)"
            initial={{ scaleX: 0, originX: '0%' }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
          />
        ))}

        {/* Arrow */}
        <motion.line
          x1="152" y1="60" x2="240" y2="60"
          stroke="var(--ink-muted)" strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
        <motion.polygon
          points="238,55 248,60 238,65"
          fill="var(--ink-muted)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.0, duration: 0.2 }}
        />

        {/* Model box */}
        <rect x="250" y="30" width="80" height="60" rx="8"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="290" y="64" textAnchor="middle" fontSize="10"
          fill="var(--ink-secondary)" fontFamily="var(--font-body)">
          Model
        </text>

        {/* Arrow out */}
        <motion.line
          x1="332" y1="60" x2="380" y2="60"
          stroke="var(--ink-muted)" strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        />
        <motion.polygon
          points="378,55 388,60 378,65"
          fill="var(--ink-muted)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.3, duration: 0.2 }}
        />

        {/* Response text */}
        <motion.text
          x="400" y="56" textAnchor="middle" fontSize="8"
          fill="var(--ink-secondary)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.3 }}
        >
          Output
        </motion.text>
      </svg>
    </div>
  )
}
