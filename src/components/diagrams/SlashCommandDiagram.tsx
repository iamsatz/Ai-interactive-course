import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const commands = ['/start', '/figma-to-code', '/review', '/ship']

export function SlashCommandDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="340" height="130" viewBox="0 0 340 130" fill="none">
        {/* Input bar */}
        <rect x="20" y="50" width="180" height="36" rx="8"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />

        {/* / character */}
        <motion.text x="36" y="73" fontSize="18"
          fill="var(--accent-claude)" fontFamily="var(--font-mono)" fontWeight="bold"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >/</motion.text>

        {/* Dropdown suggestions */}
        {commands.map((cmd, i) => (
          <motion.g key={cmd}
            initial={{ opacity: 0, y: -4 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.25 }}
          >
            <rect x="20" y={90 + i * 24} width={180} height={20} rx="4"
              fill={i === 0 ? `var(--accent-claude)14` : 'var(--bg-card)'}
              stroke={i === 0 ? 'var(--accent-claude)' : 'var(--border)'}
              strokeWidth="0.8" />
            <text x="36" y={105 + i * 24} fontSize="9"
              fill={i === 0 ? 'var(--accent-claude)' : 'var(--ink-secondary)'}
              fontFamily="var(--font-mono)">{cmd}</text>
          </motion.g>
        ))}

        {/* Arrow to workflow */}
        <motion.line x1="202" y1="68" x2="242" y2="68"
          stroke="var(--border)" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />
        <motion.rect x="244" y="50" width="80" height="36" rx="8"
          fill="var(--bg-card)" stroke="var(--accent-claude)" strokeWidth="1.2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.0 }}
        />
        <text x="284" y="72" textAnchor="middle" fontSize="9"
          fill="var(--accent-claude)" fontFamily="var(--font-body)">Skill runs</text>
      </svg>
    </div>
  )
}
