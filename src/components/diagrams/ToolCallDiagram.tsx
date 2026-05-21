import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function ToolCallDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="380" height="100" viewBox="0 0 380 100" fill="none">
        {['Think', 'Decide', 'Call tool', 'Get result'].map((step, i) => {
          const x = 20 + i * 90
          const colors = ['var(--accent-llm)', '#8F6F2A', 'var(--accent-agent)', 'var(--accent-claude)']
          return (
            <motion.g key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.35 }}
            >
              <rect x={x} y="30" width="70" height="36" rx="6"
                fill="var(--bg-card)" stroke={colors[i]} strokeWidth="1.2" />
              <text x={x + 35} y="53" textAnchor="middle" fontSize="9.5"
                fill={colors[i]} fontFamily="var(--font-body)">{step}</text>
              {i < 3 && (
                <polygon points={`${x + 73},48 ${x + 80},48 ${x + 76},52`}
                  fill="var(--border)" />
              )}
            </motion.g>
          )
        })}
        <motion.text x="190" y="92" textAnchor="middle" fontSize="8.5"
          fill="var(--ink-muted)" fontFamily="var(--font-body)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
        >
          You see a permission prompt at "Call tool"
        </motion.text>
      </svg>
    </div>
  )
}
