import { Link } from 'react-router-dom'

const termToSection: Record<string, string> = {
  'prompt': 'llm', 'token': 'llm', 'context-window': 'llm',
  'hallucination': 'llm', 'temperature': 'llm', 'embedding': 'llm',
  'tool': 'agents', 'tool-call': 'agents', 'agent-loop': 'agents',
  'harness': 'agents', 'mcp': 'agents',
  'skill': 'claude', 'slash-command': 'claude', 'permission': 'claude', 'settings': 'claude',
  'repo': 'git', 'branch': 'git', 'commit': 'git', 'diff': 'git',
  'pr': 'git', 'merge': 'git', 'squash': 'git',
  'subagent': 'power', 'worktree': 'power', 'dispatch': 'power',
  'hooks': 'power', 'memory': 'power',
}

const termLabels: Record<string, string> = {
  'prompt': 'Prompt', 'token': 'Token', 'context-window': 'Context Window',
  'hallucination': 'Hallucination', 'temperature': 'Temperature', 'embedding': 'Embedding',
  'tool': 'Tool', 'tool-call': 'Tool Call', 'agent-loop': 'Agent Loop',
  'harness': 'Harness', 'mcp': 'MCP',
  'skill': 'Skill', 'slash-command': 'Slash Command', 'permission': 'Permission',
  'settings': 'settings.json',
  'repo': 'Repo', 'branch': 'Branch', 'commit': 'Commit', 'diff': 'Diff',
  'pr': 'Pull Request', 'merge': 'Merge', 'squash': 'Squash & Merge',
  'subagent': 'Subagent', 'worktree': 'Worktree', 'dispatch': 'Dispatch',
  'hooks': 'Hooks', 'memory': 'CLAUDE.md / Memory',
}

interface RelatedTermsProps {
  ids: string[]
}

export function RelatedTerms({ ids }: RelatedTermsProps) {
  if (!ids || ids.length === 0) return null

  return (
    <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
      <p
        className="text-xs font-medium tracking-widest uppercase mb-3"
        style={{ color: 'var(--ink-muted)' }}
      >
        Related
      </p>
      <div className="flex flex-wrap gap-2">
        {ids.map(id => {
          const section = termToSection[id]
          const label = termLabels[id] ?? id
          return (
            <Link
              key={id}
              to={section ? `/section/${section}#${id}` : '#'}
              className="text-sm px-3 py-1 rounded-full transition-colors hover:opacity-80"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--ink-secondary)',
                backgroundColor: 'var(--bg-card)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
