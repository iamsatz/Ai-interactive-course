import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const planSteps = [
  '1. Read auth.ts to understand current flow',
  '2. Add new providers config in settings.json',
  '3. Update LoginForm.tsx to show provider buttons',
  '4. Run tests to verify nothing broke',
]

export function PlanModeDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-[440px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="flex items-center gap-2 mb-3"
        >
          <div
            className="px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-medium"
            style={{
              background: `var(--accent-power)18`,
              color: 'var(--accent-power)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Plan
          </div>
          <span className="text-[11px]" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
            add OAuth providers
          </span>
        </motion.div>

        {/* Plan card */}
        <div
          className="rounded-lg p-4"
          style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--accent-power)',
          }}
        >
          {planSteps.map((step, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
              className="text-[12px] py-1"
              style={{
                color: 'var(--ink-secondary)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.5,
              }}
            >
              {step}
            </motion.p>
          ))}
        </div>

        {/* Decision buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          className="flex gap-2 mt-3 justify-end"
        >
          <div
            className="px-3 py-1.5 rounded text-[11px]"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--ink-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Reject
          </div>
          <div
            className="px-3 py-1.5 rounded text-[11px]"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--ink-secondary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Edit
          </div>
          <div
            className="px-3 py-1.5 rounded text-[11px] font-medium"
            style={{
              background: 'var(--accent-power)',
              color: 'white',
              fontFamily: 'var(--font-body)',
            }}
          >
            Approve & run →
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4 }}
          className="text-[11px] mt-3 italic"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
        >
          You see the plan before any file is touched. Cheaper to catch wrong plans than undo bad code.
        </motion.p>
      </div>
    </div>
  )
}
