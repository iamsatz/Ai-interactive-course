import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function MergeDiagram() {
  const { inView } = useConceptContext()
  return (
    
      <svg width="340" height="120" viewBox="0 0 340 120" fill="none">
        {/* Main line */}
        <motion.line x1="20" y1="90" x2="320" y2="90"
          stroke="var(--accent-git)" strokeWidth="2"
          initial={{ scaleX: 0, originX: '0%' }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* Branch */}
        <motion.path d="M 100 90 Q 100 35 150 35 L 220 35 Q 260 35 260 90"
          stroke="#7C4A8F" strokeWidth="1.8" fill="none" strokeDasharray="5 3"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        />

        <motion.text x="170" y="28" textAnchor="middle" fontSize="8"
          fill="#7C4A8F" fontFamily="var(--font-mono)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}>feature branch</motion.text>

        {/* Merge commit */}
        <motion.circle cx="260" cy="90" r="8"
          fill="var(--accent-git)" stroke="var(--bg-card)" strokeWidth="2"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 1.0, duration: 0.3 }}
        />
        <motion.text x="260" y="110" textAnchor="middle" fontSize="8"
          fill="var(--accent-git)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.1 }}>merge commit</motion.text>

        <motion.text x="170" y="118" textAnchor="middle" fontSize="7.5"
          fill="var(--ink-muted)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}>full history preserved</motion.text>
      </svg>
  )
}
