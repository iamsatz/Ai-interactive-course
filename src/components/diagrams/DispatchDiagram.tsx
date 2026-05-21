import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function DispatchDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="320" height="120" viewBox="0 0 320 120" fill="none">
        {/* Brief box */}
        <motion.rect x="10" y="35" width="90" height="50" rx="8"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35 }}
        />
        <text x="55" y="56" textAnchor="middle" fontSize="9"
          fill="var(--ink-secondary)" fontFamily="var(--font-body)">Your brief</text>
        <text x="55" y="70" textAnchor="middle" fontSize="8"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">"Audit this</text>
        <text x="55" y="80" textAnchor="middle" fontSize="8"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">codebase"</text>

        {/* Arrow */}
        <motion.line x1="102" y1="60" x2="140" y2="60"
          stroke="var(--border)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />

        {/* Clock / async icon */}
        <motion.circle cx="165" cy="60" r="20"
          fill="var(--bg-card)" stroke="var(--accent-power)" strokeWidth="1.5"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
        <motion.text x="165" y="57" textAnchor="middle" fontSize="14"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}>⏱</motion.text>
        <text x="165" y="70" textAnchor="middle" fontSize="7"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">async</text>

        {/* Arrow */}
        <motion.line x1="187" y1="60" x2="220" y2="60"
          stroke="var(--border)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />

        {/* Result */}
        <motion.rect x="222" y="35" width="88" height="50" rx="8"
          fill="var(--bg-card)" stroke="var(--accent-power)" strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.0 }}
        />
        <text x="266" y="55" textAnchor="middle" fontSize="9"
          fill="var(--accent-power)" fontFamily="var(--font-body)">Results</text>
        <text x="266" y="68" textAnchor="middle" fontSize="8"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">when you wake</text>
        <text x="266" y="79" textAnchor="middle" fontSize="12">🌅</text>
      </svg>
    </div>
  )
}
