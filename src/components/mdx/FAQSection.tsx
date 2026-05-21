import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FAQ } from '@/data/faqs'

interface FAQSectionProps {
  faqs: FAQ[]
  accent?: string
}

export function FAQSection({ faqs, accent = 'var(--accent-llm)' }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mt-16 mb-8">
      <h3
        className="mb-6"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading)', color: 'var(--ink-primary)' }}
      >
        Frequently asked
      </h3>

      <div className="space-y-1">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 transition-colors"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-primary)' }}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-medium text-sm leading-snug">{faq.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 text-lg leading-none"
                style={{ color: accent }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{
                      color: 'var(--ink-secondary)',
                      borderTop: '1px solid var(--border)',
                      paddingTop: '1rem',
                    }}
                  >
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
