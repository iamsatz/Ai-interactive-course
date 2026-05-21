import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const steps = [
  { label: 'Look',   sub: 'Read inputs',     position: 'top' },
  { label: 'Decide', sub: 'Pick next move',  position: 'right' },
  { label: 'Act',    sub: 'Run a tool',      position: 'bottom' },
  { label: 'Review', sub: 'Check result',    position: 'left' },
] as const

const positionClasses = {
  top:    'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  right:  'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
  bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  left:   'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
} as const

export function AgentLoopDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="w-full flex justify-center py-4">
      <div
        className="relative w-full max-w-[380px] aspect-square"
      >
        {/* Decorative dashed ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: '20%',
            border: '1.5px dashed var(--border)',
          }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Rotation arrow — SVG overlay tracing ~270° of the loop */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <marker
              id="loop-arrow"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
              orient="auto"
            >
              <polygon points="0,0 6,3 0,6" fill="var(--accent-agent)" />
            </marker>
          </defs>
          <motion.path
            d="M 50 20 A 30 30 0 1 1 20 50"
            stroke="var(--accent-agent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
            markerEnd="url(#loop-arrow)"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
          />
        </svg>

        {/* Four nodes — Tailwind-positioned, real DOM text */}
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className={`absolute ${positionClasses[step.position]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.25 + i * 0.12, duration: 0.3 }}
          >
            <div
              className="flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl shadow-sm"
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--accent-agent)',
                minWidth: 96,
              }}
            >
              <span
                className="text-sm font-medium"
                style={{
                  color: 'var(--accent-agent)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.1,
                }}
              >
                {step.label}
              </span>
              <span
                className="text-[11px]"
                style={{
                  color: 'var(--ink-muted)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.2,
                }}
              >
                {step.sub}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Center label */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <div
            className="text-[10px] tracking-widest uppercase"
            style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
          >
            Agent loop
          </div>
          <div
            className="text-xs italic mt-0.5"
            style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-display)' }}
          >
            until done
          </div>
        </motion.div>
      </div>
    </div>
  )
}
