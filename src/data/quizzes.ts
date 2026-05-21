export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const quizzes: Record<string, QuizQuestion[]> = {
  llm: [
    {
      id: 'llm-q1',
      question: '"Strawberry" is how many tokens?',
      options: ['1 token', '2 tokens', '3 tokens', 'Depends on the model'],
      correctIndex: 1,
      explanation:
        '"Straw" and "berry" are each common subword fragments the tokenizer recognizes. The model never sees individual letters.',
    },
    {
      id: 'llm-q2',
      question: 'You need a factual answer — not creative output. Which temperature setting is best?',
      options: ['0.9 — maximum creativity', '0.5 — balanced', '0.1 — low randomness', '2.0 — maximum chaos'],
      correctIndex: 2,
      explanation:
        'Low temperature (0.1–0.3) makes the model predictable and deterministic — ideal for factual queries. Save high temperature for ideation.',
    },
    {
      id: 'llm-q3',
      question: 'The model starts ignoring instructions you gave earlier in the conversation. What is happening?',
      options: [
        'The model is choosing to ignore you',
        'A bug in the software',
        'The context window is filling up, older content is falling out',
        'Your prompt was too vague',
      ],
      correctIndex: 2,
      explanation:
        'Context windows have a finite size. When you approach the limit, earlier content drops off — the model genuinely cannot see it anymore.',
    },
  ],
  agents: [
    {
      id: 'agent-q1',
      question: 'What is the key difference between a chatbot and an agent?',
      options: [
        'Agents are smarter',
        'Agents use tools to act, not just respond',
        'Agents are always cloud-based',
        'Chatbots cannot understand code',
      ],
      correctIndex: 1,
      explanation:
        'The agent loop — look → decide → act — is what separates agents from chatbots. An agent calls tools, writes files, fetches URLs, and iterates.',
    },
    {
      id: 'agent-q2',
      question: 'What is MCP best described as?',
      options: [
        'A type of AI model',
        'A programming language',
        'A universal standard for connecting Claude to external apps',
        'A security permission system',
      ],
      correctIndex: 2,
      explanation:
        'MCP (Model Context Protocol) is the "USB-C for AI" — a standard cable that lets Claude connect to Figma, Slack, Notion, and any app that builds an MCP server.',
    },
    {
      id: 'agent-q3',
      question: 'The harness is best described as:',
      options: [
        'The AI model itself',
        'Everything around the model — UI, tools, permissions',
        'The MCP protocol',
        'A type of slash command',
      ],
      correctIndex: 1,
      explanation:
        'The harness is the car around the engine. Claude Code Desktop is the harness. The model is just the engine inside it.',
    },
  ],
  claude: [
    {
      id: 'claude-q1',
      question: 'A slash command like /figma-to-code is best described as:',
      options: [
        'An MCP connection',
        'A shortcut that triggers a saved Skill workflow',
        'A type of permission setting',
        'A settings.json key',
      ],
      correctIndex: 1,
      explanation:
        'The slash command is the trigger button. The Skill is the encoded multi-step workflow it runs. Separate them — the command is just the entry point.',
    },
    {
      id: 'claude-q2',
      question: 'When is it safe to grant automatic file write permissions?',
      options: [
        'Always — Claude is trustworthy',
        'Never — always review manually',
        'When you are on a branch with a recent commit',
        'Only on read-only files',
      ],
      correctIndex: 2,
      explanation:
        'Branch + recent commit = safety net. If Claude writes something wrong, you roll back. Never auto-approve writes on a clean main branch.',
    },
  ],
  git: [
    {
      id: 'git-q1',
      question: 'What is a branch for?',
      options: [
        'Saving the file permanently',
        'Running parallel experiments without touching main',
        'Pushing code to a remote server',
        'Compressing commit history',
      ],
      correctIndex: 1,
      explanation:
        'A branch is a parallel copy — like duplicating a Figma page before trying something risky. Main stays clean while you experiment on the copy.',
    },
    {
      id: 'git-q2',
      question: 'You used Claude for an entire feature — lots of small commits. Which merge strategy is best?',
      options: [
        'Regular merge — preserves full history',
        'Squash & merge — compresses into one clean commit',
        'Rebase — rewrites history',
        'No merge needed',
      ],
      correctIndex: 1,
      explanation:
        'AI sessions generate many tiny commits. Squash & merge collapses them into one meaningful entry on main — cleaner history.',
    },
    {
      id: 'git-q3',
      question: 'Claude shows you a diff before applying a change. What should you do?',
      options: [
        'Accept immediately — Claude is accurate',
        'Read the diff carefully before accepting',
        'Reject it — diffs are risky',
        'Ignore it and retype your prompt',
      ],
      correctIndex: 1,
      explanation:
        'The diff is your review step. Red lines are removed, green lines are added. Always read it before accepting. This is your last checkpoint before the change lands.',
    },
  ],
  power: [
    {
      id: 'power-q1',
      question: 'What makes a subagent different from just continuing a conversation?',
      options: [
        'Subagents are faster',
        'Subagents run in parallel — a focused instance for one task',
        'Subagents use different models',
        'Subagents do not need permissions',
      ],
      correctIndex: 1,
      explanation:
        'Continuing a conversation is sequential. A subagent is parallel — spawned for one focused task while the main session continues. This is the key architectural difference.',
    },
    {
      id: 'power-q2',
      question: 'Hooks in Claude Code are triggered by:',
      options: [
        'User commands only',
        'Model output',
        'Events in the Claude Code workflow (commit, tool use, etc.)',
        'External web requests',
      ],
      correctIndex: 2,
      explanation:
        'Hooks fire on Claude Code events — "whenever I commit, run the formatter." They are automation glue: event → action, without manual triggering.',
    },
  ],
}
