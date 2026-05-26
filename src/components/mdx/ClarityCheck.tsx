import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

const questions = [
  'What problem am I really trying to solve?',
  'What am I truly trying to achieve?',
  'Who is the audience of the content?',
  'What are my underlying assumptions?',
  'What are the potential consequences of this decision?',
]

export function ClarityCheck() {
  const { accent } = useConceptContext()

  return (
    <div className="my-8">
      <p
        className="text-xs font-medium tracking-widest uppercase mb-3"
        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
      >
        Questions to ask yourself for clarity · Arjun's framework
      </p>
      <p
        className="text-sm mb-5"
        style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-body)' }}
      >
        Run through these before you write the prompt. The answers are what you fold into the "background" and "instructions" components above.
      </p>

      <div
        className="rounded-2xl p-6"
        style={{
          border: `1px solid ${accent}30`,
          background: `${accent}06`,
        }}
      >
        <ol className="space-y-3 list-none m-0 p-0">
          {questions.map((q, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.07, duration: 0.25 }}
              className="flex items-start gap-3"
            >
              <span
                className="text-[11px] mt-1 shrink-0 w-5 text-right"
                style={{
                  color: accent,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                0{i + 1}
              </span>
              <span
                className="text-base"
                style={{
                  color: 'var(--ink-primary)',
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1.4,
                }}
              >
                {q}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  )
}
