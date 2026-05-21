export interface FAQ {
  q: string
  a: string
}

export const faqs: Record<string, FAQ[]> = {
  llm: [
    {
      q: 'Why does it count "strawberry" as 2 tokens?',
      a: 'Models split words into subword chunks — roughly syllables or common fragments. "Straw" and "berry" are each recognized patterns. You never see letters; the model processes these chunks.',
    },
    {
      q: 'Is higher temperature always better for creative work?',
      a: 'Not always. Very high temperature produces chaos, not creativity. For most design-adjacent tasks, 0.7–0.9 is the sweet spot. Pure factual tasks need 0.1–0.3.',
    },
    {
      q: 'How do I know if the context window is full?',
      a: 'The model starts "forgetting" earlier instructions or conversation. In Claude Code, start a new session when the conversation feels like it is losing context.',
    },
    {
      q: 'How do I reduce hallucinations?',
      a: 'Be specific in your prompt, ask the model to cite sources, and always verify outputs you rely on. Lower temperature helps for factual queries.',
    },
    {
      q: 'What is the difference between a prompt and a message?',
      a: 'A message is one turn in a conversation. A prompt is the full input — including system instructions, context, and your query. Every message is a prompt; not every prompt is a single message.',
    },
  ],
  agents: [
    {
      q: 'Is an agent just a chatbot with extra steps?',
      a: 'No. A chatbot responds. An agent acts — it calls tools, reads files, writes code, fetches URLs, and loops until the task is done. The agent loop is what separates them.',
    },
    {
      q: 'Do I need to write code to use MCP?',
      a: 'No. Many MCPs are packaged as one-click installs (Sketch, Figma, Notion, Slack). You configure them in settings.json — no coding required.',
    },
    {
      q: 'What is the difference between a tool and an MCP?',
      a: 'A tool is any capability (read file, search web). MCP is the protocol — the standard cable — that connects Claude to external apps. MCPs deliver tools from those apps.',
    },
    {
      q: 'Who controls what an agent can do?',
      a: 'You do, via the harness. Claude Code asks permission before risky actions. You configure the threshold in settings.json.',
    },
    {
      q: 'Can Claude break my files without asking?',
      a: 'By default, Claude Code asks before writing or deleting. You can tune this. Never set write permissions to auto-approve until you trust your setup.',
    },
  ],
  claude: [
    {
      q: 'What is the difference between a Skill and a slash command?',
      a: 'A Skill is the encoded workflow — the logic, steps, and instructions. A slash command is the shortcut that triggers it. The command is the button; the Skill is what it runs.',
    },
    {
      q: 'Can I build my own Skills?',
      a: 'Yes. Skills are written as markdown files that Claude reads. See Anthropic\'s blog post on Skills and the awesome-claude-skills GitHub repo for examples.',
    },
    {
      q: 'Is it safe to grant file write permissions?',
      a: 'Safe if you are on a branch and have committed recently. Never grant auto-write permission on a dirty main branch. Branch → commit → then work.',
    },
    {
      q: 'What goes in settings.json that I should know about?',
      a: 'MCP server connections, permission levels (ask/allow/deny per tool), environment variables, and hooks. Start with defaults; only change what you understand.',
    },
    {
      q: 'How is CLAUDE.md different from a prompt?',
      a: 'A prompt is what you type now. CLAUDE.md is what Claude reads at the start of every session in this project — persistent context that survives between conversations.',
    },
  ],
  git: [
    {
      q: 'Merge vs squash — which do I pick as a designer?',
      a: 'Squash & merge almost always. AI-generated sessions create many tiny commits. Squash collapses them into one meaningful entry on main. Full merge is for when you need every commit traceable.',
    },
    {
      q: 'Do I need a PR if I am working solo?',
      a: "It's optional but valuable. Even solo, a PR gives you a review checkpoint — a moment to read the diff before changes land on main. For AI-assisted code, this is worth doing.",
    },
    {
      q: 'What is a repo and why do I need one for AI work?',
      a: 'A repo records every change. When Claude produces a change you don\'t like, you roll back to the last commit. No repo means no undo beyond Cmd+Z — which does not work across sessions.',
    },
    {
      q: 'How often should I commit when working with Claude Code?',
      a: 'At every meaningful milestone — after setup, after each feature, before any risky change. Think of commits as your undo history. More granular = more control.',
    },
    {
      q: 'What does it mean when Claude shows me a diff?',
      a: 'It is showing you exactly what it plans to change — red lines removed, green lines added. Read the diff before accepting. This is your review step.',
    },
  ],
  power: [
    {
      q: 'What is the difference between a subagent and just asking Claude again?',
      a: 'Asking again is sequential — one conversation. A subagent is parallel — Claude spawns a separate focused instance for a specific task while the main session continues. Useful for complex multi-part work.',
    },
    {
      q: 'What goes in my CLAUDE.md?',
      a: 'Project name, tech stack, file structure, what is already built, what to build next, style rules, things Claude should never do. Treat it like an onboarding doc for a new collaborator.',
    },
    {
      q: 'When should I use Dispatch vs a regular session?',
      a: 'Regular session for interactive work where you want to review each step. Dispatch for long autonomous tasks — refactors, audits, research — where you can afford to let it run and review results later.',
    },
    {
      q: 'Are hooks safe to use?',
      a: 'Yes, with care. Start with read-only hooks (notify, log). Move to write/execute hooks once you understand what fires them and when.',
    },
    {
      q: 'Is worktree just multiple terminal windows?',
      a: 'Similar, but smarter. Worktrees share the same repo history — you can move commits between branches. Multiple terminals with different repos are truly isolated. Worktrees are the same project, multiple parallel states.',
    },
  ],
}
