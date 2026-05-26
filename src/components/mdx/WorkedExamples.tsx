import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

interface Example {
  useCase: string
  without: string
  withPrompt: string
}

const examples: Example[] = [
  {
    useCase: 'Weather Forecast',
    without: "What's the weather like?",
    withPrompt: "What's the weather forecast for Hyderabad this weekend? I'm planning an outdoor event and need to know about potential rain.",
  },
  {
    useCase: 'Recipe Recommendation',
    without: 'Can you suggest a recipe?',
    withPrompt: "I need a quick vegan dinner recipe using ingredients I likely have at home. I'm in the mood for something with pasta, and I have about 30 minutes to cook.",
  },
  {
    useCase: 'Travel Planning',
    without: 'Tell me about Paris.',
    withPrompt: "I'm planning a 3-day trip to Paris next month. I'm interested in art and history but want to avoid touristy areas. Can you suggest an itinerary that includes lesser-known museums and historical sites?",
  },
]

export function WorkedExamples() {
  const { accent } = useConceptContext()

  return (
    <div className="my-8">
      <p
        className="text-xs font-medium tracking-widest uppercase mb-4"
        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
      >
        Worked examples · from Arjun's workshop
      </p>

      <div className="space-y-5">
        {examples.map((ex, i) => (
          <motion.div
            key={ex.useCase}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
            }}
          >
            {/* Use-case header */}
            <div
              className="px-5 py-2.5 text-xs font-medium tracking-widest uppercase"
              style={{
                color: accent,
                backgroundColor: `${accent}10`,
                fontFamily: 'var(--font-body)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              Use case · {ex.useCase}
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--border)' }}>
              {/* Without prompting */}
              <div className="p-5">
                <p
                  className="text-[11px] uppercase tracking-widest mb-2"
                  style={{
                    color: 'var(--ink-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Without prompting
                </p>
                <p
                  className="text-base italic leading-relaxed"
                  style={{
                    color: 'var(--ink-muted)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  "{ex.without}"
                </p>
              </div>

              {/* With prompting */}
              <div
                className="p-5"
                style={{ background: `${accent}06` }}
              >
                <p
                  className="text-[11px] uppercase tracking-widest mb-2 font-medium"
                  style={{
                    color: accent,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  With prompting
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: 'var(--ink-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  "{ex.withPrompt}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
