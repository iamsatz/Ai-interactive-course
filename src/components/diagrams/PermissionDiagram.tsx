import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function PermissionDiagram() {
  const { inView } = useConceptContext()
  return (
    
      <svg width="300" height="140" viewBox="0 0 300 140" fill="none">
        <motion.rect x="60" y="20" width="180" height="100" rx="10"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="2"
          initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        />

        <motion.text x="150" y="44" textAnchor="middle" fontSize="10"
          fill="var(--ink-primary)" fontFamily="var(--font-body)" fontWeight="500"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >Write to src/App.tsx?</motion.text>

        <motion.text x="150" y="62" textAnchor="middle" fontSize="8.5"
          fill="var(--ink-muted)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >Claude wants to modify this file</motion.text>

        {/* Allow button */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <rect x="76" y="80" width="68" height="26" rx="6"
            fill="var(--accent-claude)" />
          <text x="110" y="97" textAnchor="middle" fontSize="10"
            fill="white" fontFamily="var(--font-body)" fontWeight="500">Allow</text>
        </motion.g>

        {/* Deny button */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <rect x="156" y="80" width="68" height="26" rx="6"
            fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="190" y="97" textAnchor="middle" fontSize="10"
            fill="var(--ink-secondary)" fontFamily="var(--font-body)">Deny</text>
        </motion.g>
      </svg>
  )
}
