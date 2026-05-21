import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const lines = [
  '  "permissions": {',
  '    "write": "ask",',
  '    "execute": "deny"',
  '  },',
  '  "mcpServers": {',
  '    "figma": { ... }',
  '  },',
  '  "hooks": { ... }',
]

export function SettingsDiagram() {
  const { inView } = useConceptContext()
  return (
    <div className="my-6 flex justify-center">
      <svg width="340" height="150" viewBox="0 0 340 150" fill="none">
        <rect x="20" y="10" width="200" height="130" rx="8"
          fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
        <text x="32" y="30" fontSize="9" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
          settings.json
        </text>
        <line x1="20" y1="36" x2="220" y2="36" stroke="var(--border)" strokeWidth="1" />

        {lines.map((line, i) => {
          const isKey = line.includes(':')
          return (
            <motion.text key={i} x="28" y={52 + i * 12}
              fontSize="8" fontFamily="var(--font-mono)"
              fill={isKey ? 'var(--accent-claude)' : 'var(--ink-secondary)'}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
            >
              {line}
            </motion.text>
          )
        })}

        {/* Legend */}
        {[
          { label: 'Permissions', color: 'var(--accent-claude)', y: 40 },
          { label: 'MCP servers', color: '#2A6D8F', y: 65 },
          { label: 'Hooks', color: '#8F6F2A', y: 90 },
        ].map((l, i) => (
          <motion.g key={i}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 + i * 0.12 }}
          >
            <circle cx="248" cy={l.y} r="5" fill={`${l.color}30`} stroke={l.color} strokeWidth="1.2" />
            <text x="258" y={l.y + 4} fontSize="9" fill="var(--ink-secondary)" fontFamily="var(--font-body)">
              {l.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
