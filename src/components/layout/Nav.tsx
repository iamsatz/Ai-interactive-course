import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '@/hooks/useProgress'

const navLinks = [
  { to: '/section/llm', label: 'LLM Basics', accent: 'var(--accent-llm)' },
  { to: '/section/agents', label: 'Agents', accent: 'var(--accent-agent)' },
  { to: '/section/claude', label: 'Claude Code', accent: 'var(--accent-claude)' },
  { to: '/section/git', label: 'Git', accent: 'var(--accent-git)' },
  { to: '/section/power', label: 'Power User', accent: 'var(--accent-power)' },
  { to: '/resources', label: 'Resources', accent: 'var(--accent-resources)' },
]

export function Nav() {
  const { pathname } = useLocation()
  const { completed, total } = useProgress()
  const pct = Math.round((completed / total) * 100)

  return (
    <header
      className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between gap-4"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 shrink-0"
        style={{ textDecoration: 'none' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            color: 'var(--ink-primary)',
          }}
        >
          AI Field Guide
        </span>
      </Link>

      {/* Nav links — hidden on small screens */}
      <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
        {navLinks.map(link => {
          const active = pathname.startsWith(link.to)
          return (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{
                fontFamily: 'var(--font-body)',
                color: active ? link.accent : 'var(--ink-secondary)',
                backgroundColor: active ? `${link.accent}14` : 'transparent',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Progress pill */}
      <div
        className="shrink-0 flex items-center gap-2 text-xs"
        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
      >
        <div
          className="hidden sm:flex w-24 h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--border)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: 'var(--ink-primary)' }}
          />
        </div>
        <span>{completed}/{total}</span>
      </div>
    </header>
  )
}
