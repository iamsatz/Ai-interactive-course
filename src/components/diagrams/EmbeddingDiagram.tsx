import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const dots = [
  { x: 80, y: 60, label: 'Modern\nScandinavian', cluster: 'design' },
  { x: 110, y: 80, label: 'Minimalist\nNordic', cluster: 'design' },
  { x: 95, y: 45, label: 'Clean\nlines', cluster: 'design' },
  { x: 210, y: 90, label: 'Warm\nterracotta', cluster: 'color' },
  { x: 240, y: 70, label: 'Earth\ntones', cluster: 'color' },
  { x: 225, y: 105, label: 'Rustic\npalette', cluster: 'color' },
  { x: 310, y: 50, label: 'Machine\nlearning', cluster: 'tech' },
  { x: 335, y: 68, label: 'Neural\nnets', cluster: 'tech' },
]

const clusterColors: Record<string, string> = {
  design: '#4A7C59',
  color: '#D4622A',
  tech: '#2A6D8F',
}

export function EmbeddingDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="my-6 flex justify-center">
      <svg width="400" height="150" viewBox="0 0 400 150" fill="none">
        {/* Axes */}
        <motion.line x1="30" y1="130" x2="390" y2="130"
          stroke="var(--border)" strokeWidth="1"
          initial={{ scaleX: 0, originX: '0%' }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.line x1="30" y1="10" x2="30" y2="130"
          stroke="var(--border)" strokeWidth="1"
          initial={{ scaleY: 0, originY: '100%' }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5 }}
        />
        <text x="390" y="128" textAnchor="end" fontSize="8"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">concept →</text>
        <text x="34" y="14" fontSize="8"
          fill="var(--ink-muted)" fontFamily="var(--font-body)">meaning ↑</text>

        {/* Cluster halos */}
        {[
          { cx: 95, cy: 63, r: 38, cluster: 'design' },
          { cx: 225, cy: 88, r: 32, cluster: 'color' },
          { cx: 323, cy: 60, r: 30, cluster: 'tech' },
        ].map(h => (
          <motion.circle key={h.cluster}
            cx={h.cx} cy={h.cy} r={h.r}
            fill={`${clusterColors[h.cluster]}10`}
            stroke={`${clusterColors[h.cluster]}30`} strokeWidth="1"
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        ))}

        {/* Dots + labels */}
        {dots.map((d, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
          >
            <circle cx={d.x} cy={d.y} r="4" fill={clusterColors[d.cluster]} />
            {d.label.split('\n').map((line, li) => (
              <text key={li} x={d.x + 7} y={d.y + 3 + li * 10} fontSize="7.5"
                fill="var(--ink-secondary)" fontFamily="var(--font-body)"
              >
                {line}
              </text>
            ))}
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
