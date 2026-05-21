import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const tools = [
  { name: 'Read',     mode: 'auto',  icon: '📖', risk: 'low'  },
  { name: 'Grep',     mode: 'auto',  icon: '🔎', risk: 'low'  },
  { name: 'WebFetch', mode: 'auto',  icon: '🌐', risk: 'low'  },
  { name: 'Edit',     mode: 'ask',   icon: '✏️',  risk: 'med'  },
  { name: 'Write',    mode: 'ask',   icon: '💾', risk: 'med'  },
  { name: 'Bash',     mode: 'ask',   icon: '⚡', risk: 'high' },
]

export function AutoAcceptDiagram() {
  const { inView } = useConceptContext()

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-[440px]">
        <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}>
          A sane profile
        </p>

        <div className="space-y-1.5">
          {tools.map((t, i) => {
            const isAuto = t.mode === 'auto'
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ delay: i * 0.08, duration: 0.25 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${isAuto ? 'var(--accent-power)' : 'var(--border)'}`,
                }}
              >
                <span className="text-base">{t.icon}</span>
                <span
                  className="text-sm flex-1"
                  style={{
                    color: 'var(--ink-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {t.name}
                </span>
                <span
                  className="text-[11px] px-2 py-0.5 rounded"
                  style={{
                    background: isAuto ? `var(--accent-power)14` : 'transparent',
                    border: isAuto ? 'none' : '1px solid var(--border)',
                    color: isAuto ? 'var(--accent-power)' : 'var(--ink-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: isAuto ? 500 : 400,
                  }}
                >
                  {isAuto ? 'auto' : 'ask'}
                </span>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
          className="text-[11px] mt-4 italic leading-relaxed"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
        >
          Auto-accept the safe stuff. Ask for the rest. Maintain two profiles — solo experiments vs client work.
        </motion.p>
      </div>
    </div>
  )
}
