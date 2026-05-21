import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tasks as allTasks } from '@/data/tasks'
import type { Task } from '@/data/tasks'

const STORAGE_PREFIX = 'ai-field-guide-task-'
const INITIAL_VISIBLE = 3

interface ConceptLink {
  id: string
  term: string
}

interface TasksSectionProps {
  concepts: ConceptLink[]
  accent: string
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
  } catch { /* full */ }
}

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

interface ConceptTaskBlockProps {
  conceptId: string
  term: string
  tasks: Task[]
  accent: string
}

function ConceptTaskBlock({ conceptId, term, tasks, accent }: ConceptTaskBlockProps) {
  const [visible, setVisible] = useState(INITIAL_VISIBLE)
  const [done, setDone] = useState<Set<number>>(() => loadDone(conceptId))

  const hasMore = visible < tasks.length

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
    <div id={`tasks-${conceptId}`} className="scroll-mt-24">
      <div className="flex items-baseline justify-between mb-3">
        <h3
          className="text-base"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--ink-primary)',
          }}
        >
          {term}
        </h3>
        <p
          className="text-[11px]"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {done.size}/{tasks.length}
        </p>
      </div>

      <ol className="space-y-2 list-none m-0 p-0">
        {tasks.slice(0, visible).map((task, i) => {
          const isDone = done.has(i)
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
            >
              <button
                onClick={() => toggle(i)}
                className="flex items-start gap-3 w-full text-left p-3 rounded-lg transition-all hover:shadow-sm"
                style={{
                  background: isDone ? `${accent}06` : 'var(--bg-card)',
                  border: `1px solid ${isDone ? accent : 'var(--border)'}`,
                  cursor: 'pointer',
                }}
              >
                <span
                  className="mt-0.5 shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all"
                  style={{
                    background: isDone ? accent : 'transparent',
                    border: `1.5px solid ${isDone ? accent : 'var(--border)'}`,
                  }}
                >
                  {isDone && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>

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
            onClick={() => setVisible(v => Math.min(v + 3, tasks.length))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm transition-colors hover:underline"
            style={{
              color: accent,
              fontFamily: 'var(--font-body)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Load {Math.min(3, tasks.length - visible)} more →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export function TasksSection({ concepts, accent }: TasksSectionProps) {
  // Only include concepts that have tasks
  const conceptsWithTasks = concepts.filter(c => (allTasks[c.id] ?? []).length > 0)
  if (conceptsWithTasks.length === 0) return null

  return (
    <motion.section
      id="try-this"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="my-14 scroll-mt-24"
    >
      <div className="mb-6">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-3"
          style={{ color: accent, fontFamily: 'var(--font-body)' }}
        >
          Try this
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.25,
          }}
        >
          Hands-on practice
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-body)' }}
        >
          A few exercises per concept. Doing beats reading every time. Check them off as you go — progress is saved locally.
        </p>
      </div>

      <div className="space-y-10">
        {conceptsWithTasks.map(c => (
          <ConceptTaskBlock
            key={c.id}
            conceptId={c.id}
            term={c.term}
            tasks={allTasks[c.id]}
            accent={accent}
          />
        ))}
      </div>
    </motion.section>
  )
}
