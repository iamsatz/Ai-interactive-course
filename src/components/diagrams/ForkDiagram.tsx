import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function ForkDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-[440px] flex flex-col gap-3">
        {/* Trunk: messages 1 → 4 */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ delay: i * 0.1, duration: 0.25 }}
              className="flex items-center"
            >
              <div
                className="px-3 py-1.5 rounded-md text-xs font-mono"
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--accent-power)',
                  color: 'var(--accent-power)',
                }}
              >
                msg {n}
              </div>
              {i < 3 && (
                <div className="w-3 h-px" style={{ background: 'var(--accent-power)', opacity: 0.5 }} />
              )}
            </motion.div>
          ))}

          {/* Fork point */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="ml-2 flex flex-col items-start gap-1"
          >
            <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
              fork ↓
            </span>
          </motion.div>
        </div>

        {/* Fork branch — indented, styled differently */}
        <motion.div
          className="flex items-center gap-2 pl-12 mt-2"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <span className="text-base" style={{ color: 'var(--accent-power)', opacity: 0.6 }}>↳</span>
          {['try', 'risky', 'change'].map((label) => (
            <div
              key={label}
              className="px-3 py-1.5 rounded-md text-xs font-mono"
              style={{
                background: `var(--accent-power)10`,
                border: '1.5px dashed var(--accent-power)',
                color: 'var(--accent-power)',
                opacity: 0.75,
              }}
            >
              {label}
            </div>
          ))}
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
          className="text-[11px] mt-3 leading-relaxed italic"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
        >
          Original session stays intact. Walk back from the fork if it doesn't work — no tokens wasted re-loading context.
        </motion.p>
      </div>
    </div>
  )
}
