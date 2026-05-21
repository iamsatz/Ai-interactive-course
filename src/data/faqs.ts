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
      a: 'The model starts "forgetting" earlier instructions or contradicting itself. In Claude Code, run /context to see exact usage. When it feels off, start a new session.',
    },
    {
      q: 'How do I reduce hallucinations?',
      a: 'Be specific. Ask for citations. Verify outputs you rely on. Lower temperature for factual queries. Build the habit: after any factual claim, ask "where did you get that?"',
    },
    {
      q: 'What is the difference between a prompt and a message?',
      a: 'A message is one turn in a conversation. A prompt is the full input — including system instructions, context, and your query. Every message is a prompt; not every prompt is one message.',
    },
    {
      q: 'How big is the context window in practice?',
      a: 'Today\'s frontier models hold ~200,000 tokens. That\'s a short novel. It sounds like a lot — but in long agentic sessions with file reads and tool output, it fills faster than you\'d expect.',
    },
    {
      q: 'Do all languages use the same number of tokens?',
      a: 'No. English is the cheapest. Most other languages cost 2–5× more tokens per word. Code, JSON, and structured formats also have their own tokenization rates.',
    },
    {
      q: 'Can the model learn from our conversation?',
      a: 'Not in the long-term sense. Within a session it remembers context. Between sessions it forgets — unless you use a memory feature (Claude.ai memory, CLAUDE.md, ChatGPT custom instructions).',
    },
    {
      q: 'Why does it sometimes refuse to answer something simple?',
      a: 'Safety filters. The model has trained refusal patterns. If a phrase looks like a harmful request — even when it isn\'t — it may decline. Rephrase, add context, or be more specific about your intent.',
    },
    {
      q: 'Are embeddings what makes AI search "smart"?',
      a: 'Yes. Embeddings encode meaning as numbers. That\'s what lets "AI search" return results based on intent, not just keywords. Notion AI, Perplexity, and ChatGPT search all use embeddings under the hood.',
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
      a: 'By default, no — Claude Code asks before writing or deleting. You can tune this. Never set write permissions to auto-approve until you trust your setup and you\'re on a branch.',
    },
    {
      q: 'When does an agent loop actually stop?',
      a: 'When Claude decides the task is done, when the harness hits a stop condition (max iterations, time limit), when a tool fails, or when you manually halt. The harness usually adds safety nets.',
    },
    {
      q: 'Why does Claude pick the wrong tool sometimes?',
      a: 'Same reason a junior teammate would — incomplete information about what each tool does best. Prompt engineering helps: be explicit about which tool to use, or restrict the available tool list.',
    },
    {
      q: 'Is MCP just for Claude?',
      a: 'No. MCP is an open spec. ChatGPT, Cursor, Windsurf, and others support it. It\'s becoming the standard for AI ↔ external-tool integration. Learn it once, use it everywhere.',
    },
    {
      q: 'How do I know if I need an agent vs a chatbot?',
      a: 'If the task only involves talking — explaining, summarizing, drafting — use a chat. If it involves acting — running code, modifying files, searching the web in a loop — use an agent.',
    },
    {
      q: 'Can the harness be different from the model?',
      a: 'Yes. Cursor uses Claude. So does Windsurf. So does Claude Code. Same model, three different harnesses, three different experiences. The harness is its own product.',
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
      a: 'Safe if you\'re on a branch and have committed recently. Never grant auto-write permission on a dirty main branch. Branch → commit → then work.',
    },
    {
      q: 'What goes in settings.json that I should know about?',
      a: 'MCP server connections, permission levels (ask/allow/deny per tool), environment variables, and hooks. Start with defaults; only change what you understand.',
    },
    {
      q: 'How is CLAUDE.md different from a prompt?',
      a: 'A prompt is what you type now. CLAUDE.md is what Claude reads at the start of every session in this project — persistent context that survives between conversations.',
    },
    {
      q: 'What happens when I run a slash command?',
      a: 'Claude loads the Skill behind that command, reads its instructions, and starts following them. From your side it feels instant. From Claude\'s side it\'s as if you pasted a long, structured prompt.',
    },
    {
      q: 'Should I share my settings.json with my team?',
      a: 'The non-secret parts, yes — MCP configs, hooks, slash commands. Version-control them. Secret keys go in environment variables, not settings.json directly.',
    },
    {
      q: 'How do I revoke a permission I shouldn\'t have granted?',
      a: 'Open settings.json, find the permission block, change "allow" back to "ask" or "deny". Restart Claude Code. Easy.',
    },
    {
      q: 'Can a Skill call other Skills?',
      a: 'Yes. Skills can compose. A "weekly review" Skill might call "summarize-prs," "list-stale-docs," and "draft-status-update" as sub-steps. Build small, then combine.',
    },
    {
      q: 'Why does Claude Code feel different from Cursor?',
      a: 'Same model under the hood. Different harness. Claude Code is more terminal-native and shows its work more transparently. Cursor is more IDE-native and hides tool calls more. Both are valid; pick the workflow that fits.',
    },
  ],

  git: [
    {
      q: 'Merge vs squash — which do I pick as a designer?',
      a: 'Squash & merge almost always. AI-generated sessions create many tiny commits. Squash collapses them into one meaningful entry on main. Full merge is for when you need every commit traceable.',
    },
    {
      q: 'Do I need a PR if I am working solo?',
      a: 'It\'s optional but valuable. Even solo, a PR gives you a review checkpoint — a moment to read the diff before changes land on main. For AI-assisted code, this is worth doing.',
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
    {
      q: 'How do I undo a commit I just made?',
      a: 'git reset HEAD~1 (keeps your changes) or git reset --hard HEAD~1 (discards them). The first is almost always what you want.',
    },
    {
      q: 'What\'s the difference between local and remote?',
      a: 'Local = on your computer. Remote = on GitHub (or another host). A commit is local until you push it. People forget to push, lose laptops, lose work. Push often.',
    },
    {
      q: 'Can I edit a commit message after I made it?',
      a: 'Yes, with git commit --amend if it\'s the last commit. For older commits, you\'d need an interactive rebase — but that\'s rarely worth it for solo work.',
    },
    {
      q: 'What happens if I get a merge conflict?',
      a: 'Git pauses and shows you the conflicting lines. You decide what stays. Save, commit, done. They\'re not scary — just decisions about which version of a line you want.',
    },
    {
      q: 'Why do branches matter for AI-assisted work?',
      a: 'Claude can break things. On a branch, the breakage is isolated. Switch back to main and it\'s as if nothing happened. On main with no branch, you have to manually undo every wrong change.',
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
    {
      q: 'When should I fork a session vs start a fresh one?',
      a: 'Fork when you want to try a risky change but keep the safe path intact. Fresh session when the context is so cluttered it\'s slowing things down. Fork preserves context; fresh discards it.',
    },
    {
      q: 'Does compaction lose information?',
      a: 'It summarizes — so fine-grained detail is lost. But your CLAUDE.md and the major decisions usually survive. Worth running manually before a heavy task to start with a tidy context.',
    },
    {
      q: 'When is plan mode worth the extra step?',
      a: 'On anything non-trivial — refactors, multi-file changes, anything you\'d need to undo if it went wrong. The plan takes 30 seconds. Catching a bad plan saves 30 minutes of undo.',
    },
    {
      q: 'Can I have multiple CLAUDE.md files?',
      a: 'Yes. One per project at the root. Claude reads the one for the current working directory. You can also nest them in subdirectories for scoped context.',
    },
    {
      q: 'What does auto-accept actually skip?',
      a: 'It skips the human approval step before specific tool calls. Configure per tool — auto-accept Read and Grep (safe), ask for Edit and Bash (risky). Granular control = fast workflow without surprises.',
    },
  ],
}
