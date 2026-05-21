import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function TemperatureDiagram() {
  const { inView } = useConceptContext()

  return (
    
      <svg width="400" height="140" viewBox="0 0 400 140" fill="none">
        {/* Slider track */}
        <rect x="40" y="55" width="240" height="6" rx="3"
          fill="var(--border)" />

        {/* Gradient fill */}
        <motion.rect x="40" y="55" height="6" rx="3"
          fill="url(#tempGrad)"
          initial={{ width: 0 }}
          animate={inView ? { width: 240 } : { width: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        />

        <defs>
          <linearGradient id="tempGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A6D8F" />
            <stop offset="100%" stopColor="#D4622A" />
          </linearGradient>
        </defs>

        {/* Knob */}
        <motion.circle cx="40" cy="58" r="9" fill="var(--bg-card)"
          stroke="var(--border)" strokeWidth="1.5"
          initial={{ cx: 40 }}
          animate={inView ? { cx: 160 } : { cx: 40 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        />

        {/* Labels */}
        <text x="40" y="80" textAnchor="middle" fontSize="9"
          fill="#2A6D8F" fontFamily="var(--font-body)">0.0</text>
        <text x="280" y="80" textAnchor="middle" fontSize="9"
          fill="#D4622A" fontFamily="var(--font-body)">1.0</text>

        <text x="40" y="93" textAnchor="middle" fontSize="8"
          fill="#2A6D8F" fontFamily="var(--font-body)">predictable</text>
        <text x="280" y="93" textAnchor="middle" fontSize="8"
          fill="#D4622A" fontFamily="var(--font-body)">creative chaos</text>

        {/* Example outputs */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        >
          <rect x="310" y="15" width="82" height="50" rx="6"
            fill="#2A6D8F14" stroke="#2A6D8F" strokeWidth="1" />
          <text x="351" y="32" textAnchor="middle" fontSize="8"
            fill="#2A6D8F" fontFamily="var(--font-body)" fontWeight="500">Low temp</text>
          <text x="351" y="46" textAnchor="middle" fontSize="7.5"
            fill="var(--ink-secondary)" fontFamily="var(--font-body)">Same answer</text>
          <text x="351" y="57" textAnchor="middle" fontSize="7.5"
            fill="var(--ink-secondary)" fontFamily="var(--font-body)">every time</text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <rect x="310" y="80" width="82" height="50" rx="6"
            fill="#D4622A14" stroke="#D4622A" strokeWidth="1" />
          <text x="351" y="97" textAnchor="middle" fontSize="8"
            fill="#D4622A" fontFamily="var(--font-body)" fontWeight="500">High temp</text>
          <text x="351" y="111" textAnchor="middle" fontSize="7.5"
            fill="var(--ink-secondary)" fontFamily="var(--font-body)">Wildly different</text>
          <text x="351" y="122" textAnchor="middle" fontSize="7.5"
            fill="var(--ink-secondary)" fontFamily="var(--font-body)">each run</text>
        </motion.g>
      </svg>
  )
}
