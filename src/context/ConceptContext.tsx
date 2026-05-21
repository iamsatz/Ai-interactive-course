import { createContext, useContext } from 'react'

interface ConceptContextValue {
  inView: boolean
  conceptId: string
}

export const ConceptContext = createContext<ConceptContextValue>({
  inView: false,
  conceptId: '',
})

export function useConceptContext() {
  return useContext(ConceptContext)
}
