import type { ReactNode } from 'react'

interface WhyItMattersProps {
  children: ReactNode
  accent?: string
}

export function WhyItMatters({ children, accent = 'var(--accent-llm)' }: WhyItMattersProps) {
  return (
    <div
      className="my-6 p-5 rounded-lg"
      style={{
        backgroundColor: `${accent}0d`,
        border: `1px solid ${accent}30`,
      }}
    >
      <p
        className="text-xs font-medium tracking-widest uppercase mb-2"
        style={{ color: accent, fontFamily: 'var(--font-body)' }}
      >
        Why it matters
      </p>
      <p
        className="leading-relaxed m-0 font-medium"
        style={{ color: 'var(--ink-primary)', fontFamily: 'var(--font-body)' }}
      >
        {children}
      </p>
    </div>
  )
}
