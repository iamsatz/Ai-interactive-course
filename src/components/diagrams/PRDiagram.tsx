import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function PRDiagram() {
  const { inView } = useConceptContext()
  return (
    
      <svg width="340" height="120" viewBox="0 0 340 120" fill="none">
        {/* Feature branch */}
        <motion.rect x="10" y="20" width="100" height="30" rx="6"
          fill="#7C4A8F14" stroke="#7C4A8F" strokeWidth="1.2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35 }}
        />
        <text x="60" y="40" textAnchor="middle" fontSize="9"
          fill="#7C4A8F" fontFamily="var(--font-mono)">feature/new-ui</text>

        {/* PR box */}
        <motion.rect x="130" y="35" width="80" height="50" rx="8"
          fill="var(--bg-card)" stroke="var(--accent-git)" strokeWidth="1.5"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        />
        <text x="170" y="55" textAnchor="middle" fontSize="9"
          fill="var(--accent-git)" fontFamily="var(--font-body)" fontWeight="500">Pull</text>
        <text x="170" y="68" textAnchor="middle" fontSize="9"
          fill="var(--accent-git)" fontFamily="var(--font-body)" fontWeight="500">Request</text>
        <text x="170" y="80" textAnchor="middle" fontSize="7.5"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">review gate</text>

        {/* Arrow: feature → PR */}
        <motion.line x1="112" y1="35" x2="128" y2="50"
          stroke="#7C4A8F" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />

        {/* Main branch */}
        <motion.rect x="230" y="45" width="100" height="30" rx="6"
          fill="var(--accent-git)14" stroke="var(--accent-git)" strokeWidth="1.2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        />
        <text x="280" y="65" textAnchor="middle" fontSize="9"
          fill="var(--accent-git)" fontFamily="var(--font-mono)">main</text>

        {/* Arrow: PR → main */}
        <motion.line x1="212" y1="60" x2="228" y2="60"
          stroke="var(--accent-git)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />
        <polygon points="226,55 236,60 226,65" fill="var(--accent-git)"
          opacity={inView ? 1 : 0} />

        <motion.text x="170" y="110" textAnchor="middle" fontSize="8"
          fill="var(--ink-muted)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.0 }}
        >Review diff before merge — even solo</motion.text>
      </svg>
  )
}
