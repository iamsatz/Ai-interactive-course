import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const trees = [
  { branch: 'main', label: 'Production', color: 'var(--accent-git)', x: 10 },
  { branch: 'feature/a', label: 'Experiment A', color: '#7C4A8F', x: 120 },
  { branch: 'feature/b', label: 'Experiment B', color: '#8F6F2A', x: 230 },
]

export function WorktreeDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="340" height="130" viewBox="0 0 340 130" fill="none">
        {trees.map((t, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
          >
            {/* Window frame */}
            <rect x={t.x} y="15" width="100" height="80" rx="6"
              fill="var(--bg-card)" stroke={t.color} strokeWidth="1.2" />
            {/* Title bar */}
            <rect x={t.x} y="15" width="100" height="18" rx="6"
              fill={`${t.color}18`} />
            <text x={t.x + 50} y="28" textAnchor="middle" fontSize="8"
              fill={t.color} fontFamily="var(--font-mono)">{t.branch}</text>
            {/* Content lines */}
            {[0, 1, 2].map(j => (
              <rect key={j} x={t.x + 8} y={42 + j * 14} width={60 + j * 8} height="6"
                rx="2" fill={`${t.color}20`} />
            ))}
            <text x={t.x + 50} y="108" textAnchor="middle" fontSize="8"
              fill="var(--ink-muted)" fontFamily="var(--font-body)">{t.label}</text>
          </motion.g>
        ))}
        <motion.text x="170" y="126" textAnchor="middle" fontSize="8"
          fill="var(--ink-muted)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}>same repo — three live states</motion.text>
      </svg>
    </div>
  )
}
