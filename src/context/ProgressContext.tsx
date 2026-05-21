import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

const STORAGE_KEY = 'ai-field-guide-progress'
const TOTAL_CONCEPTS = 27

function loadProgress(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? new Set(JSON.parse(stored) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

interface ProgressContextValue {
  read: Set<string>
  markRead: (id: string) => void
  isRead: (id: string) => boolean
  sectionProgress: (ids: string[]) => { completed: number; total: number }
  reset: () => void
  completed: number
  total: number
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [read, setRead] = useState<Set<string>>(loadProgress)

  const markRead = useCallback((id: string) => {
    setRead(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch { /* storage full */ }
      return next
    })
  }, [])

  const isRead = useCallback((id: string) => read.has(id), [read])

  const sectionProgress = useCallback(
    (ids: string[]) => ({
      completed: ids.filter(id => read.has(id)).length,
      total: ids.length,
    }),
    [read]
  )

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setRead(new Set())
  }, [])

  return (
    <ProgressContext.Provider value={{ read, markRead, isRead, sectionProgress, reset, completed: read.size, total: TOTAL_CONCEPTS }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
