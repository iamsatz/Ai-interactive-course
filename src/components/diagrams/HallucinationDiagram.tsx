import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function HallucinationDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="my-6 flex justify-center">
      <svg width="380" height="130" viewBox="0 0 380 130" fill="none">
        {/* Prompt */}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.4 }}>
          <rect x="10" y="40" width="110" height="50" rx="8"
            fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="65" y="62" textAnchor="middle" fontSize="9"
            fill="var(--ink-muted)" fontFamily="var(--font-body)">Cite a study on</text>
          <text x="65" y="76" textAnchor="middle" fontSize="9"
            fill="var(--ink-muted)" fontFamily="var(--font-body)">this topic</text>
        </motion.g>

        {/* Arrow */}
        <motion.line x1="122" y1="65" x2="165" y2="65"
          stroke="var(--border)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />
        <motion.polygon points="163,60 173,65 163,70" fill="var(--border)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        />

        {/* Response — looks confident */}
        <motion.g
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <rect x="175" y="20" width="130" height="90" rx="8"
            fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="240" y="44" textAnchor="middle" fontSize="9"
            fill="var(--ink-secondary)" fontFamily="var(--font-body)">Smith et al. (2021),</text>
          <text x="240" y="57" textAnchor="middle" fontSize="9"
            fill="var(--ink-secondary)" fontFamily="var(--font-body)">Journal of AI Research,</text>
          <text x="240" y="70" textAnchor="middle" fontSize="9"
            fill="var(--ink-secondary)" fontFamily="var(--font-body)">pp. 112–128.</text>
        </motion.g>

        {/* Confident check → then X */}
        <motion.text x="240" y="96" textAnchor="middle" fontSize="14"
          fill="#4A7C59"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.1, duration: 0.3 }}
        >
          ✓ confident
        </motion.text>

        {/* Warning badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          <rect x="318" y="38" width="58" height="44" rx="6"
            fill="#D4622A14" stroke="#D4622A" strokeWidth="1.2" />
          <text x="347" y="57" textAnchor="middle" fontSize="18" fill="#D4622A">
            ✗
          </text>
          <text x="347" y="74" textAnchor="middle" fontSize="8"
            fill="#D4622A" fontFamily="var(--font-body)">
            fake cite
          </text>
        </motion.g>
      </svg>
    </div>
  )
}
