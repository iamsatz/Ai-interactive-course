import type { ComponentType } from 'react'
import { PromptDiagram } from './PromptDiagram'
import { TokenDiagram } from './TokenDiagram'
import { ContextWindowDiagram } from './ContextWindowDiagram'
import { HallucinationDiagram } from './HallucinationDiagram'
import { TemperatureDiagram } from './TemperatureDiagram'
import { EmbeddingDiagram } from './EmbeddingDiagram'
import { ToolDiagram } from './ToolDiagram'
import { ToolCallDiagram } from './ToolCallDiagram'
import { AgentLoopDiagram } from './AgentLoopDiagram'
import { HarnessDiagram } from './HarnessDiagram'
import { MCPDiagram } from './MCPDiagram'
import { SkillDiagram } from './SkillDiagram'
import { SlashCommandDiagram } from './SlashCommandDiagram'
import { PermissionDiagram } from './PermissionDiagram'
import { SettingsDiagram } from './SettingsDiagram'
import { RepoDiagram } from './RepoDiagram'
import { BranchDiagram } from './BranchDiagram'
import { CommitDiagram } from './CommitDiagram'
import { DiffDiagram } from './DiffDiagram'
import { PRDiagram } from './PRDiagram'
import { MergeDiagram } from './MergeDiagram'
import { SquashDiagram } from './SquashDiagram'
import { SubagentDiagram } from './SubagentDiagram'
import { WorktreeDiagram } from './WorktreeDiagram'
import { DispatchDiagram } from './DispatchDiagram'
import { HooksDiagram } from './HooksDiagram'
import { MemoryDiagram } from './MemoryDiagram'

export const diagramMap: Record<string, ComponentType> = {
  'prompt': PromptDiagram,
  'token': TokenDiagram,
  'context-window': ContextWindowDiagram,
  'hallucination': HallucinationDiagram,
  'temperature': TemperatureDiagram,
  'embedding': EmbeddingDiagram,
  'tool': ToolDiagram,
  'tool-call': ToolCallDiagram,
  'agent-loop': AgentLoopDiagram,
  'harness': HarnessDiagram,
  'mcp': MCPDiagram,
  'skill': SkillDiagram,
  'slash-command': SlashCommandDiagram,
  'permission': PermissionDiagram,
  'settings': SettingsDiagram,
  'repo': RepoDiagram,
  'branch': BranchDiagram,
  'commit': CommitDiagram,
  'diff': DiffDiagram,
  'pr': PRDiagram,
  'merge': MergeDiagram,
  'squash': SquashDiagram,
  'subagent': SubagentDiagram,
  'worktree': WorktreeDiagram,
  'dispatch': DispatchDiagram,
  'hooks': HooksDiagram,
  'memory': MemoryDiagram,
}
