import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const components = [
  {
    name: 'Task description',
    tag: 'mandatory',
    hints: 'chain-of-thought · analyse · summarise · categorise',
  },
  {
    name: 'Relevant background information',
    tag: 'context, important',
    hints: 'Who you are. What you\'re trying to do. The setup the model needs to make sense of the task.',
  },
  {
    name: 'Examples',
    tag: 'shots, important',
    hints: 'One or two examples of the output you want. Few-shot prompting beats few words almost every time.',
  },
  {
    name: 'Specific instructions',
    tag: 'nice-to-have, follow-ups',
    hints: 'Format · structure · style · filters · do\'s and don\'ts · constraints',
  },
  {
    name: 'Data inputs',
    tag: 'nuances, hyper-specific',
    hints: 'The actual content the model should work with — files, text, numbers, the thing being summarised.',
  },
]

export function PromptAnatomy() {
  const { accent } = useConceptContext()

  return (
    <div className="my-8">
      <p
        className="text-xs font-medium tracking-widest uppercase mb-4"
        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
      >
        Anatomy of a prompt · Arjun's framework
      </p>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
        }}
      >
        {components.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="px-5 py-4 flex items-start gap-4"
            style={{
              borderBottom: i < components.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            {/* Number badge */}
            <div
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium mt-0.5"
              style={{
                background: `${accent}14`,
                color: accent,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {i + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <h4
                  className="text-base font-medium"
                  style={{
                    color: 'var(--ink-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {c.name}
                </h4>
                <span
                  className="text-[11px] italic"
                  style={{
                    color: 'var(--ink-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {c.tag}
                </span>
              </div>
              <p
                className="text-sm"
                style={{
                  color: 'var(--ink-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                }}
              >
                {c.hints}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
