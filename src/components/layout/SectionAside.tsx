import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tasks as allTasks } from '@/data/tasks'

interface ConceptLink {
  id: string
  term: string
}

interface SectionAsideProps {
  concepts: ConceptLink[]
  accent: string
}

const STORAGE_PREFIX = 'ai-field-guide-task-'
const INITIAL_VISIBLE = 3

function loadDone(conceptId: string): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + conceptId)
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set()
  } catch {
    return new Set()
  }
}

function saveDone(conceptId: string, done: Set<number>) {
  try {
    localStorage.setItem(STORAGE_PREFIX + conceptId, JSON.stringify([...done]))
  } catch { /* full */ }
}

export function SectionAside({ concepts, accent }: SectionAsideProps) {
  const [active, setActive] = useState<string>(concepts[0]?.id ?? '')
  const [visible, setVisible] = useState(INITIAL_VISIBLE)
  const [done, setDone] = useState<Set<number>>(new Set())

  // Track which concept is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    concepts.forEach(c => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [concepts])

  // Reload tasks done-state when active concept changes
  useEffect(() => {
    if (active) {
      setDone(loadDone(active))
      setVisible(INITIAL_VISIBLE)
    }
  }, [active])

  const conceptTasks = useMemo(() => allTasks[active] ?? [], [active])
  const hasMore = visible < conceptTasks.length

  const toggle = (i: number) => {
    setDone(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      saveDone(active, next)
      return next
    })
  }

  return (
    <aside className="hidden lg:block sticky top-24 self-start w-64 shrink-0">

      {/* Concept nav */}
      <nav>
        <p
          className="text-xs font-medium tracking-widest uppercase mb-3"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
        >
          In this section
        </p>
        <ul className="space-y-0.5 list-none m-0 p-0">
          {concepts.map(c => {
            const isActive = active === c.id
            return (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="flex items-center gap-2 py-1.5 text-sm transition-colors rounded-md px-2 -mx-2"
                  style={{
                    color: isActive ? 'var(--ink-primary)' : 'var(--ink-muted)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? '500' : '400',
                  }}
                >
                  {isActive ? (
                    <motion.div
                      layoutId="nav-indicator"
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                  ) : (
                    <div className="w-1 h-1 shrink-0" />
                  )}
                  {c.term}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Tasks for the active concept */}
      <AnimatePresence mode="wait">
        {conceptTasks.length > 0 && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-8 pt-6"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="flex items-baseline justify-between mb-3">
              <p
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
              >
                Try this
              </p>
              <p
                className="text-[10px]"
                style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {done.size}/{conceptTasks.length}
              </p>
            </div>

            <ol className="space-y-2 list-none m-0 p-0">
              {conceptTasks.slice(0, visible).map((task, i) => {
                const isDone = done.has(i)
                return (
                  <li key={i}>
                    <button
                      onClick={() => toggle(i)}
                      className="flex items-start gap-2 w-full text-left p-2 rounded-md transition-all"
                      style={{
                        background: isDone ? `${accent}06` : 'transparent',
                        border: `1px solid ${isDone ? accent : 'var(--border)'}`,
                        cursor: 'pointer',
                      }}
                    >
                      {/* Checkbox */}
                      <span
                        className="mt-0.5 shrink-0 w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-all"
                        style={{
                          background: isDone ? accent : 'transparent',
                          border: `1.5px solid ${isDone ? accent : 'var(--border)'}`,
                        }}
                      >
                        {isDone && (
                          <svg width="8" height="6" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[12px] leading-snug"
                          style={{
                            color: isDone ? 'var(--ink-muted)' : 'var(--ink-secondary)',
                            textDecoration: isDone ? 'line-through' : 'none',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {task.prompt}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-[9px] tracking-wider"
                            style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}
                            title={task.difficulty === 1 ? 'Beginner' : task.difficulty === 2 ? 'Intermediate' : 'Power user'}
                          >
                            {'★'.repeat(task.difficulty)}{'☆'.repeat(3 - task.difficulty)}
                          </span>
                          {task.where && (
                            <span
                              className="text-[9px] truncate"
                              style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}
                            >
                              {task.where}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ol>

            {hasMore && (
              <button
                onClick={() => setVisible(v => Math.min(v + 3, conceptTasks.length))}
                className="mt-2 text-xs transition-colors hover:underline"
                style={{
                  color: accent,
                  fontFamily: 'var(--font-body)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Load {Math.min(3, conceptTasks.length - visible)} more →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}
