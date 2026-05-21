import { useConceptContext } from '@/context/ConceptContext'
import { diagramMap } from '@/components/diagrams'

interface DiagramProps {
  id?: string
}

export function Diagram({ id }: DiagramProps) {
  const { conceptId } = useConceptContext()
  const resolvedId = id ?? conceptId
  const DiagramComponent = diagramMap[resolvedId]

  if (!DiagramComponent) {
    return (
      <div
        className="my-6 h-28 rounded-lg flex items-center justify-center text-sm"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px dashed var(--border)', color: 'var(--ink-muted)' }}
      >
        Diagram: {resolvedId}
      </div>
    )
  }

  return (
    <div className="diagram-card">
      <DiagramComponent />
    </div>
  )
}
