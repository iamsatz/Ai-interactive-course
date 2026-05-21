import { createContext, useContext } from 'react'

interface ConceptContextValue {
  inView: boolean
  conceptId: string
  accent: string
}

export const ConceptContext = createContext<ConceptContextValue>({
  inView: false,
  conceptId: '',
  accent: 'var(--accent-llm)',
})

export function useConceptContext() {
  return useContext(ConceptContext)
}
