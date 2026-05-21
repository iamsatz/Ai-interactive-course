export interface Section {
  id: string
  title: string
  description: string
  accent: string
  order: number
  conceptCount: number
  nextId: string | null
}

export const sections: Section[] = [
  {
    id: 'llm',
    title: 'LLM Basics',
    description: 'The vocabulary underneath every AI interaction. Start here.',
    accent: 'var(--accent-llm)',
    order: 1,
    conceptCount: 6,
    nextId: 'agents',
  },
  {
    id: 'agents',
    title: 'Agents',
    description: 'How models stop talking and start acting.',
    accent: 'var(--accent-agent)',
    order: 2,
    conceptCount: 5,
    nextId: 'claude',
  },
  {
    id: 'claude',
    title: 'Claude Code',
    description: 'The harness, the commands, and the config that shapes Claude.',
    accent: 'var(--accent-claude)',
    order: 3,
    conceptCount: 4,
    nextId: 'git',
  },
  {
    id: 'git',
    title: 'Git',
    description: 'Your safety net when Claude writes code. Non-negotiable.',
    accent: 'var(--accent-git)',
    order: 4,
    conceptCount: 7,
    nextId: 'power',
  },
  {
    id: 'power',
    title: 'Power User',
    description: 'Parallel agents, async work, and persistent memory.',
    accent: 'var(--accent-power)',
    order: 5,
    conceptCount: 5,
    nextId: null,
  },
]

export function getSectionById(id: string): Section | undefined {
  return sections.find(s => s.id === id)
}
