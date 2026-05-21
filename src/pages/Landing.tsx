import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sections } from '@/data/sections'
import { useProgress } from '@/hooks/useProgress'

export function Landing() {
  const { sectionProgress } = useProgress()

  const sectionIds: Record<string, string[]> = {
    llm: ['prompt', 'token', 'context-window', 'hallucination', 'temperature', 'embedding'],
    agents: ['tool', 'tool-call', 'agent-loop', 'harness', 'mcp'],
    claude: ['skill', 'slash-command', 'permission', 'settings'],
    git: ['repo', 'branch', 'commit', 'diff', 'pr', 'merge', 'squash'],
    power: ['subagent', 'worktree', 'dispatch', 'hooks', 'memory'],
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <p
          className="text-xs font-medium tracking-widest uppercase mb-6"
          style={{ color: 'var(--ink-muted)' }}
        >
          Interactive course
        </p>
        <h1
          style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
          className="mb-6 leading-tight"
        >
          AI Field Guide
        </h1>
        <p
          className="text-lg leading-relaxed max-w-xl"
          style={{ color: 'var(--ink-secondary)' }}
        >
          27 terms. 5 sections. The vocabulary you need to work confidently with AI —
          designed for learners, not engineers.
        </p>
        <Link
          to="/section/llm"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-medium text-sm transition-opacity hover:opacity-85"
          style={{
            backgroundColor: 'var(--ink-primary)',
            color: 'var(--bg-base)',
            fontFamily: 'var(--font-body)',
            textDecoration: 'none',
          }}
        >
          Start learning →
        </Link>
      </motion.div>

      {/* Section grid */}
      <div className="grid gap-4">
        {sections.map((section, i) => {
          const ids = sectionIds[section.id] ?? []
          const prog = sectionProgress(ids)
          const pct = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                to={`/section/${section.id}`}
                className="group flex items-center gap-6 p-5 rounded-xl transition-all hover:shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
              >
                {/* Accent dot */}
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: section.accent }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-0.5">
                    <span
                      className="font-normal text-base"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
                    >
                      {section.title}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                      {section.conceptCount} concepts
                    </span>
                  </div>
                  <p className="text-sm m-0" style={{ color: 'var(--ink-secondary)' }}>
                    {section.description}
                  </p>
                </div>

                {/* Progress */}
                <div className="shrink-0 flex items-center gap-3">
                  {pct > 0 && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-16 h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--border)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: section.accent }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>{pct}%</span>
                    </div>
                  )}
                  <span
                    className="text-lg transition-transform group-hover:translate-x-0.5"
                    style={{ color: section.accent }}
                  >→</span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Footer credit */}
      <motion.p
        className="mt-20 text-xs text-center"
        style={{ color: 'var(--ink-muted)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Workshop material by{' '}
        <a href="https://x.com/arjunphlox" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--ink-secondary)' }}>Arjun Phlox</a>.
        This site is a teaching layer — not a replacement.
      </motion.p>
    </main>
  )
}
