import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

export function CompactionDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-[480px] grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Before */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
            Before
          </span>
          {[
            { label: 'system prompt', kept: true },
            { label: 'msg 1', kept: false },
            { label: 'tool call', kept: false },
            { label: 'msg 2', kept: false },
            { label: 'search result', kept: false },
            { label: 'msg 3', kept: false },
            { label: 'tool call', kept: false },
            { label: 'msg 4', kept: false },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className="text-[11px] px-2.5 py-1 rounded"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${row.kept ? 'var(--accent-power)' : 'var(--border)'}`,
                color: row.kept ? 'var(--accent-power)' : 'var(--ink-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {row.label}
            </motion.div>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--accent-power)', fontFamily: 'var(--font-body)' }}>
            /compact
          </span>
          <span className="text-2xl" style={{ color: 'var(--accent-power)' }}>→</span>
        </motion.div>

        {/* After */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
            After
          </span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9 }}
            className="text-[11px] px-2.5 py-1 rounded"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--accent-power)',
              color: 'var(--accent-power)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            system prompt
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ delay: 1.0, duration: 0.3 }}
            className="text-[11px] px-2.5 py-2 rounded"
            style={{
              background: `var(--accent-power)10`,
              border: '1px dashed var(--accent-power)',
              color: 'var(--ink-secondary)',
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              lineHeight: 1.4,
            }}
          >
            Summary of msgs 1–4: discussed auth flow, picked OAuth, edited 3 files.
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.3 }}
            className="text-[10px] mt-1"
            style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
          >
            ~80% fewer tokens · key context survived
          </motion.p>
        </div>
      </div>
    </div>
  )
}
