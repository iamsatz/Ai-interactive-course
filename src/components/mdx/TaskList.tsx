import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'
import { tasks as allTasks } from '@/data/tasks'

const STORAGE_PREFIX = 'ai-field-guide-task-'
const INITIAL_VISIBLE = 3

function StarBadge({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span
      className="text-[10px] tracking-wider"
      style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}
      title={
        level === 1 ? 'Beginner' : level === 2 ? 'Intermediate' : 'Power user'
      }
    >
      {'★'.repeat(level)}{'☆'.repeat(3 - level)}
    </span>
  )
}

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
  } catch { /* storage full */ }
}

export function TaskList({ accent: accentProp }: { accent?: string }) {
  const { conceptId, accent: accentFromContext } = useConceptContext()
  const conceptTasks = useMemo(() => allTasks[conceptId] ?? [], [conceptId])
  const [visible, setVisible] = useState(INITIAL_VISIBLE)
  const [done, setDone] = useState<Set<number>>(() => loadDone(conceptId))

  if (conceptTasks.length === 0) return null

  const accentColor = accentProp ?? accentFromContext ?? 'var(--accent-llm)'
  const hasMore = visible < conceptTasks.length

  const toggle = (i: number) => {
    setDone(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      saveDone(conceptId, next)
      return next
    })
  }

  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between mb-4">
        <p
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
        >
          Try this
        </p>
        <p
          className="text-[11px]"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
        >
          {done.size}/{conceptTasks.length} done
        </p>
      </div>

      <ol className="space-y-2.5">
        {conceptTasks.slice(0, visible).map((task, i) => {
          const isDone = done.has(i)
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              <button
                onClick={() => toggle(i)}
                className="flex items-start gap-3 w-full text-left p-3 rounded-lg transition-all hover:shadow-sm"
                style={{
                  background: isDone ? `${accentColor}06` : 'var(--bg-card)',
                  border: `1px solid ${isDone ? accentColor : 'var(--border)'}`,
                  cursor: 'pointer',
                }}
              >
                {/* Checkbox */}
                <span
                  className="mt-0.5 shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all"
                  style={{
                    background: isDone ? accentColor : 'transparent',
                    border: `1.5px solid ${isDone ? accentColor : 'var(--border)'}`,
                  }}
                >
                  {isDone && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>

                {/* Task body */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm leading-snug mb-1"
                    style={{
                      color: isDone ? 'var(--ink-muted)' : 'var(--ink-secondary)',
                      textDecoration: isDone ? 'line-through' : 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {task.prompt}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <StarBadge level={task.difficulty} />
                    {task.where && (
                      <span
                        className="text-[11px]"
                        style={{
                          color: 'var(--ink-muted)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {task.where}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </motion.li>
          )
        })}
      </ol>

      <AnimatePresence>
        {hasMore && (
          <motion.button
            onClick={() => setVisible(v => Math.min(v + 3, conceptTasks.length))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm transition-colors hover:underline"
            style={{
              color: accentColor,
              fontFamily: 'var(--font-body)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Load {Math.min(3, conceptTasks.length - visible)} more →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
