import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function BranchDiagram() {
  const { inView } = useConceptContext()
  return (
    
      <svg width="360" height="130" viewBox="0 0 360 130" fill="none">
        {/* Main branch */}
        <motion.line x1="20" y1="65" x2="340" y2="65"
          stroke="var(--accent-git)" strokeWidth="2"
          initial={{ scaleX: 0, originX: '0%' }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Branch fork */}
        <motion.path d="M 140 65 Q 140 30 180 30 L 320 30"
          stroke="#7C4A8F" strokeWidth="1.8" fill="none" strokeDasharray="5 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />

        {/* Labels */}
        <motion.text x="180" y="80" fontSize="9" fill="var(--accent-git)" fontFamily="var(--font-mono)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}>main</motion.text>
        <motion.text x="180" y="22" fontSize="9" fill="#7C4A8F" fontFamily="var(--font-mono)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}>feature/my-experiment</motion.text>

        {/* Commit dots */}
        {[20, 80, 140, 200, 260, 320].map((x, i) => (
          <motion.circle key={i} cx={x} cy="65" r="5"
            fill="var(--bg-card)" stroke="var(--accent-git)" strokeWidth="1.5"
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          />
        ))}
        {[180, 260, 320].map((x, i) => (
          <motion.circle key={`b${i}`} cx={x} cy="30" r="5"
            fill="var(--bg-card)" stroke="#7C4A8F" strokeWidth="1.5"
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          />
        ))}

        <motion.text x="180" y="115" textAnchor="middle" fontSize="8.5"
          fill="var(--ink-muted)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.1 }}
        >main stays clean — experiment on the copy</motion.text>
      </svg>
  )
}
