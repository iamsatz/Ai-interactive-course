import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const apps = [
  { label: 'Figma', color: '#7C4A8F', y: 20 },
  { label: 'Notion', color: '#2A6D8F', y: 55 },
  { label: 'Slack', color: '#4A7C59', y: 90 },
  { label: 'Browser', color: '#8F6F2A', y: 125 },
]

export function MCPDiagram() {
  const { inView } = useConceptContext()
  return (
      <svg width="340" height="190" viewBox="0 0 340 190" fill="none">
        {/* Claude box */}
        <rect x="10" y="60" width="80" height="40" rx="8"
          fill="var(--bg-card)" stroke="var(--ink-primary)" strokeWidth="1.5" />
        <text x="50" y="84" textAnchor="middle" fontSize="11"
          fill="var(--ink-primary)" fontFamily="var(--font-body)">Claude</text>

        {/* MCP hub — circle holds only the acronym */}
        <motion.circle cx="175" cy="80" r="22"
          fill="var(--bg-card)" stroke="var(--accent-agent)" strokeWidth="1.5"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
        <motion.text x="175" y="84" textAnchor="middle" fontSize="11"
          fontWeight="500"
          fill="var(--accent-agent)" fontFamily="var(--font-mono)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >MCP</motion.text>

        {/* Caption below the circle — the subtitle lives here, with room */}
        <motion.text x="175" y="120" textAnchor="middle" fontSize="9"
          fill="var(--ink-muted)" fontFamily="var(--font-body)"
          fontStyle="italic"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >USB-C for AI</motion.text>

        {/* Line Claude → MCP */}
        <motion.line x1="92" y1="80" x2="152" y2="80"
          stroke="var(--accent-agent)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />

        {/* App connectors */}
        {apps.map((app, i) => (
          <motion.g key={app.label}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
          >
            <line x1="197" y1="80" x2="242" y2={app.y + 14}
              stroke={`${app.color}60`} strokeWidth="1.2" />
            <rect x="242" y={app.y} width="70" height="28" rx="6"
              fill={`${app.color}14`} stroke={app.color} strokeWidth="1" />
            <text x="277" y={app.y + 18} textAnchor="middle" fontSize="11"
              fill={app.color} fontFamily="var(--font-body)" fontWeight="500">{app.label}</text>
          </motion.g>
        ))}
      </svg>
  )
}
