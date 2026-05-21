import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { confusions as allConfusions } from '@/data/confusions'

interface ConfusionsProps {
  sectionId: string
  accent: string
}

export function Confusions({ sectionId, accent }: ConfusionsProps) {
  const items = allConfusions[sectionId] ?? []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (items.length === 0) return null

  return (
    <motion.section
      id="common-misconceptions"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="my-14 scroll-mt-24"
    >
      {/* Heading */}
      <div className="mb-6">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-3"
          style={{ color: accent, fontFamily: 'var(--font-body)' }}
        >
          Reality check
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.25,
          }}
        >
          Common misconceptions
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-body)' }}
        >
          Skim these. Mark the ones you would have agreed with before reading the section — those are the mental models worth revisiting.
        </p>
      </div>

      {/* Cards */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
        }}
      >
        {items.map((c, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              style={{
                borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-start gap-3 text-left px-5 py-4 transition-colors"
                style={{
                  background: isOpen ? `${accent}06` : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {/* Number badge */}
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium mt-0.5"
                  style={{
                    background: `${accent}14`,
                    color: accent,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {i + 1}
                </span>

                {/* Myth */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm leading-snug"
                    style={{
                      color: 'var(--ink-primary)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: 'var(--ink-muted)' }}>Myth:</span>{' '}
                    {c.myth}
                  </p>
                </div>

                {/* Toggle */}
                <span
                  className="shrink-0 text-base transition-transform"
                  style={{
                    color: accent,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="px-5 pb-4 pl-14"
                      style={{ background: `${accent}06` }}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: 'var(--ink-secondary)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        <span style={{ color: accent, fontWeight: 500 }}>Reality:</span>{' '}
                        {c.reality}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}
