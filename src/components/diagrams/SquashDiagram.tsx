import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function SquashDiagram() {
  const { inView } = useConceptContext()
  const many = [0, 1, 2, 3, 4, 5]

  return (
    <div className="my-6 flex justify-center">
      <svg width="340" height="110" viewBox="0 0 340 110" fill="none">
        {/* Many commits on branch */}
        <text x="80" y="16" textAnchor="middle" fontSize="8.5"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">AI session — 6 commits</text>
        <line x1="10" y1="35" x2="150" y2="35" stroke="var(--border)" strokeWidth="1.5" />
        {many.map(i => (
          <motion.circle key={i} cx={10 + i * 28} cy="35" r="5"
            fill="var(--bg-card)" stroke="#7C4A8F" strokeWidth="1.2"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          />
        ))}

        {/* Arrow */}
        <motion.path d="M 155 35 Q 200 35 200 55 Q 200 75 165 75"
          stroke="var(--border)" strokeWidth="1.5" fill="none" strokeDasharray="4 3"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
        <motion.text x="195" y="52" fontSize="8" fill="var(--ink-muted)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.1 }}>squash</motion.text>

        {/* Main + one commit */}
        <motion.line x1="165" y1="75" x2="330" y2="75"
          stroke="var(--accent-git)" strokeWidth="2"
          initial={{ scaleX: 0, originX: '0%' }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        />
        <motion.circle cx="200" cy="75" r="8"
          fill="var(--accent-git)" stroke="var(--bg-card)" strokeWidth="2"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        />
        <motion.text x="200" y="95" textAnchor="middle" fontSize="8"
          fill="var(--accent-git)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.3 }}>1 clean commit</motion.text>
      </svg>
    </div>
  )
}
