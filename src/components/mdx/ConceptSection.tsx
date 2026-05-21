import { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { ConceptContext } from '@/context/ConceptContext'
import { useProgress } from '@/hooks/useProgress'

interface ConceptSectionProps {
  id: string
  term: string
  category: 'llm' | 'agent' | 'claude' | 'git' | 'power'
  oneLiner: string
  children: ReactNode
}

const categoryLabels: Record<string, string> = {
  llm: 'LLM Basics',
  agent: 'Agents',
  claude: 'Claude Code',
  git: 'Git',
  power: 'Power User',
}

const categoryAccents: Record<string, string> = {
  llm: 'var(--accent-llm)',
  agent: 'var(--accent-agent)',
  claude: 'var(--accent-claude)',
  git: 'var(--accent-git)',
  power: 'var(--accent-power)',
}

export function ConceptSection({ id, term, category, oneLiner, children }: ConceptSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })
  const { markRead, isRead } = useProgress()
  const accent = categoryAccents[category]
  const already = isRead(id)

  useEffect(() => {
    if (inView) markRead(id)
  }, [inView, id, markRead])

  return (
    <ConceptContext.Provider value={{ inView, conceptId: id }}>
      <motion.section
        ref={ref}
        id={id}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ scrollMarginTop: '5rem' }}
        className="relative"
      >
        {/* Side accent bar */}
        <div
          className="absolute left-0 top-2 w-0.5 rounded-full transition-all duration-500"
          style={{
            height: inView ? '100%' : '0%',
            backgroundColor: accent,
            opacity: inView ? 1 : 0,
          }}
        />

        <div className="pl-6 pb-16">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-medium tracking-widest uppercase px-2 py-0.5 rounded"
                style={{ color: accent, backgroundColor: `${accent}18` }}
              >
                {categoryLabels[category]}
              </span>
              {already && (
                <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                  ✓ read
                </span>
              )}
            </div>
            <h2
              className="mb-2"
              style={{ fontSize: 'var(--text-term)', fontFamily: 'var(--font-display)' }}
            >
              {term}
            </h2>
            <p
              className="text-base font-medium"
              style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-body)' }}
            >
              {oneLiner}
            </p>
          </div>

          {/* MDX content */}
          <div className="prose-concept">{children}</div>
        </div>
      </motion.section>
    </ConceptContext.Provider>
  )
}
