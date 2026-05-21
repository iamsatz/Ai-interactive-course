import type { ReactNode } from 'react'

interface AnalogyProps {
  children: ReactNode
}

export function Analogy({ children }: AnalogyProps) {
  return (
    <div
      className="my-6 p-5 rounded-lg border-l-4"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderLeftColor: 'var(--ink-muted)',
        borderTop: '1px solid var(--border)',
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <p
        className="text-xs font-medium tracking-widest uppercase mb-2"
        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
      >
        Analogy
      </p>
      <p
        className="italic leading-relaxed m-0"
        style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}
      >
        {children}
      </p>
    </div>
  )
}
