export interface Task {
  prompt: string        // the task itself
  where?: string        // where to do it (Claude.ai, Claude Code, etc.)
  difficulty: 1 | 2 | 3 // ★, ★★, ★★★
}

/* ─────────────────────────────────────────────────────────────
   Tasks per concept. 6–8 each.
   First 3 surface initially; rest unlock via "Load more".
   ───────────────────────────────────────────────────────────── */

export const tasks: Record<string, Task[]> = {

  // ── LLM Basics ─────────────────────────────────────────────
  prompt: [
    // Arjun's three worked examples — the actual exercises from the workshop
    { prompt: 'Weather: ask "What\'s the weather like?" Then rewrite it to include the place, the timeframe, and why you\'re asking. Compare the two answers.', where: 'Claude.ai', difficulty: 1 },
    { prompt: 'Recipe: ask "Can you suggest a recipe?" Then rewrite with constraints — dietary preference, ingredients on hand, time available. Compare.', where: 'Claude.ai', difficulty: 1 },
    { prompt: 'Travel: ask "Tell me about Paris." Then rewrite as a 3-day itinerary brief with interests and a "what to avoid" filter. Compare.', where: 'Claude.ai', difficulty: 1 },
    // Apply Arjun's 5-part anatomy
    { prompt: 'Take one prompt you wrote this week. Map it against Arjun\'s 5 components — task / background / examples / instructions / data. Which were missing?', where: 'Anywhere', difficulty: 2 },
    { prompt: 'Before your next AI question, run through Arjun\'s 5 clarity questions on paper. Fold the answers into your prompt.', where: 'Anywhere', difficulty: 2 },
    { prompt: 'Add one example of the output format you want to a prompt that previously had none. Note how the response shape changes.', where: 'Claude.ai', difficulty: 2 },
    { prompt: 'Try "prompting yourself" — use Claude to interview YOU about a topic, then write from the answers. Better than writing from a blank page.', where: 'Claude.ai · Perplexity · Dot', difficulty: 2 },
    { prompt: 'Build a reusable prompt template for one task you do weekly. Use Arjun\'s 5-part structure as the scaffold.', where: 'Anywhere', difficulty: 3 },
    { prompt: 'Try PromptPerfect or a similar prompt optimizer on one of your prompts. Notice what it adds — those are usually the things you forgot.', where: 'promptperfect.com', difficulty: 3 },
  ],
  token: [
    { prompt: 'Run "How many tokens is this sentence?" — try with 5 different sentences of varying length.', where: 'Claude.ai', difficulty: 1 },
    { prompt: 'Paste a long article into Claude and ask for the token count. Compare it to the word count.', where: 'Claude.ai', difficulty: 1 },
    { prompt: 'Look up the token cost per million for Claude Sonnet vs Opus. Calculate roughly what 10 long sessions per week would cost.', where: 'docs.anthropic.com', difficulty: 2 },
    { prompt: 'Find a non-English text. Compare its token count to the English equivalent. Notice how much more expensive other languages are.', where: 'Claude.ai', difficulty: 2 },
    { prompt: 'Take a markdown file with code. Compare the token count to the same content without code blocks.', where: 'Claude.ai', difficulty: 2 },
    { prompt: 'Ask Claude to rewrite a long prompt of yours to use 50% fewer tokens without losing meaning.', where: 'Claude.ai', difficulty: 3 },
  ],
  'context-window': [
    { prompt: 'Start a Claude Code session. Run /context to see how full the context window is. Track it as your conversation grows.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'In a long chat, paste an instruction at the start, then ask Claude about it 20 messages later. Did it remember exactly?', where: 'Claude.ai', difficulty: 1 },
    { prompt: 'Note when Claude starts contradicting earlier instructions in a session. That is your context fill signal.', where: 'Claude.ai', difficulty: 2 },
    { prompt: 'Practice "context restating" — paste a quick summary of where you are when a session feels long. See if responses tighten up.', where: 'Claude.ai', difficulty: 2 },
    { prompt: 'Start a fresh session when an old one is dragging. Notice the immediate quality jump.', where: 'Anywhere', difficulty: 2 },
    { prompt: 'Compare a single 100k-token session to five 20k-token sessions for the same project. Which felt sharper?', where: 'Claude Code', difficulty: 3 },
  ],
  hallucination: [
    { prompt: 'Ask Claude for the citation of a paper on a niche topic. Verify the citation exists. Note what it got wrong.', where: 'Claude.ai', difficulty: 1 },
    { prompt: 'Ask Claude about events from this week. Note when it confidently fabricates vs admits the cutoff.', where: 'Claude.ai', difficulty: 1 },
    { prompt: 'Spot the hallucination in a Claude response you saved. What was the giveaway?', where: 'Anywhere', difficulty: 2 },
    { prompt: 'Compare the same factual question at temperature 0.2 vs 0.9. Which version hallucinates more?', where: 'Claude API', difficulty: 2 },
    { prompt: 'Ask Claude to label its own confidence after each claim. Notice how often it flags low confidence on things you would have trusted.', where: 'Claude.ai', difficulty: 2 },
    { prompt: 'Build the habit: after any factual answer, ask "Where did you get that?" Verify before using.', where: 'Anywhere', difficulty: 3 },
  ],
  temperature: [
    { prompt: 'Ask the same factual question 3 times in a row. Note the differences. Now try at temperature 0.9 in the API. Bigger swings?', where: 'Claude API', difficulty: 1 },
    { prompt: 'Brainstorm 20 product names at temperature 0.3 vs 0.9. Which list is more useful?', where: 'Claude API', difficulty: 2 },
    { prompt: 'Generate JSON output at temperature 0.0 vs 0.7. Where does the structure start to break?', where: 'Claude API', difficulty: 2 },
    { prompt: 'For a critical client deliverable — what temperature do you want? Why?', where: 'Anywhere', difficulty: 2 },
    { prompt: 'Find a real-world Claude Code task where you would override the default temperature. Justify why.', where: 'Claude Code', difficulty: 3 },
  ],
  // embedding — intentionally has no tasks.
  // It's a purely conceptual topic for this audience: designers need to
  // recognise that "AI search isn't keyword search," not practice embeddings
  // directly. The TaskList component renders nothing when the entry is missing.

  // ── Agents ──────────────────────────────────────────────────
  tool: [
    { prompt: 'In Claude Code, ask Claude to list every tool it currently has access to. Note which are read vs write.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Watch Claude in action — note every time it announces a tool call. Which tools does it reach for first?', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Disable the Web Search tool in settings. Ask a question that needs current info. See how Claude responds.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Find one task you used Claude.ai for that would have been faster with Claude Code\'s tools. Redo it.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Read the Bash tool docs. What can it do? What is it restricted from doing?', where: 'docs.anthropic.com', difficulty: 3 },
    { prompt: 'Compare Claude with all tools enabled vs Claude.ai (no tools) for one design audit task. Note the differences.', where: 'Side by side', difficulty: 2 },
  ],
  'tool-call': [
    { prompt: 'Watch one Claude Code session and count the tool calls. Was it efficient or did it loop?', where: 'Claude Code', difficulty: 1 },
    { prompt: 'When Claude makes a tool call you did not expect, ask it why it picked that tool.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Find a task where Claude failed because it picked the wrong tool. Reprompt to suggest the right one.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Read a Claude session log line by line. Mark every tool call → tool result pair.', where: 'Claude Code logs', difficulty: 2 },
    { prompt: 'In plan mode, see how Claude lists its planned tool calls before running them.', where: 'Claude Code', difficulty: 3 },
  ],
  'agent-loop': [
    { prompt: 'Watch Claude finish a task and stop. Note which step triggered the stop — was it done, or did it think it was done?', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Find a task where Claude looped too long. What signal would have told it to stop sooner?', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Give Claude a vague task. Watch how the agent loop handles ambiguity — does it ask, or guess?', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Trace one full agent loop iteration in a session: Look → Decide → Act → Review. What inputs went into Decide?', where: 'Claude Code', difficulty: 3 },
    { prompt: 'In a research task, count how many loop iterations Claude does before producing the final answer.', where: 'Claude Code', difficulty: 2 },
  ],
  harness: [
    { prompt: 'Open settings.json and read it line by line. What is each setting doing?', where: 'Claude Code config', difficulty: 1 },
    { prompt: 'Try Claude Code, then try the same task in Cursor or Windsurf. The "model" is the same; the harness is different. What feels different?', where: 'Two tools', difficulty: 2 },
    { prompt: 'Change one harness setting (permissions, default model). Note how the session experience changes.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Read the Claude Code source / docs for one harness behaviour you have noticed. Now you know how it works.', where: 'docs.anthropic.com', difficulty: 3 },
    { prompt: 'Compare two harnesses (Claude Code Desktop vs Cursor) doing the same task. Which decisions did each harness make differently?', where: 'Side by side', difficulty: 3 },
  ],
  mcp: [
    { prompt: 'Install one MCP server you do not have yet (Figma, Notion, or Linear). Run one task that uses it.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Browse the MCP servers list. Which 3 would meaningfully change your workflow?', where: 'MCP registry', difficulty: 1 },
    { prompt: 'Set up the Figma MCP. Ask Claude to summarize a frame from a Figma file you own.', where: 'Claude Code + Figma', difficulty: 2 },
    { prompt: 'Find an MCP that does not exist yet but should. Write a one-paragraph spec for it.', where: 'Anywhere', difficulty: 3 },
    { prompt: 'Read the MCP spec overview (first 5 minutes). Now you know why every new AI tool says "MCP support."', where: 'modelcontextprotocol.io', difficulty: 2 },
    { prompt: 'Compare doing a task with the relevant MCP vs without it. Quantify the time saved.', where: 'Claude Code', difficulty: 2 },
  ],

  // ── Claude Code ─────────────────────────────────────────────
  skill: [
    { prompt: 'Browse awesome-claude-skills. Install one Skill that fits your workflow. Use it on a real task.', where: 'GitHub + Claude Code', difficulty: 1 },
    { prompt: 'Identify a repetitive task you do weekly. Write a 10-line Skill markdown for it.', where: 'Text editor', difficulty: 2 },
    { prompt: 'Read one well-written Skill (from awesome-claude-skills). Copy its structure for your own.', where: 'GitHub', difficulty: 2 },
    { prompt: 'Run /skill list in Claude Code. Read the description of every Skill you have. Delete ones you do not use.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Build a Skill that wraps one Figma + Slack workflow into one command.', where: 'Claude Code', difficulty: 3 },
    { prompt: 'Share a Skill you wrote with someone. Watch them use it. Note what you would change.', where: 'Anywhere', difficulty: 3 },
  ],
  'slash-command': [
    { prompt: 'Run /help in Claude Code. Read every slash command. Use one you have never used before.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Use /compact to manually compact a long session. Note what got dropped.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Build a custom slash command for one daily ritual (standup notes, week recap, design audit).', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Map your favourite 3 slash commands to muscle memory. Run each one without looking at the help.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Compare /fork vs starting a fresh session. When does each one save you tokens?', where: 'Claude Code', difficulty: 3 },
  ],
  permission: [
    { prompt: 'Open settings.json. Read the permissions block. Note which tools are auto-allowed.', where: 'Claude Code config', difficulty: 1 },
    { prompt: 'Set one risky tool to "ask every time" and one safe tool to "allow." Use Claude for an hour. Was that right?', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Try the same task with "ask all" permissions vs "auto-accept all." Note where you actually wanted to be asked.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'After a permission denial, read what Claude was trying to do. Was your intuition right?', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Configure permission profiles for two contexts (solo experiment, client work). Switch between them.', where: 'Claude Code', difficulty: 3 },
  ],
  settings: [
    { prompt: 'Locate your settings.json file. Read every line. Note which fields you do not understand.', where: 'Claude Code config', difficulty: 1 },
    { prompt: 'Add one MCP server via settings.json. Restart Claude Code. Confirm it works.', where: 'Claude Code config', difficulty: 2 },
    { prompt: 'Set up a hook that runs a notification when Claude finishes a task. Now go make coffee.', where: 'Claude Code config', difficulty: 2 },
    { prompt: 'Diff your settings.json against the default. Are your changes intentional? Document them.', where: 'Terminal', difficulty: 3 },
    { prompt: 'Version-control your settings.json in a dotfiles repo. Sync it between machines.', where: 'GitHub', difficulty: 3 },
  ],

  // ── Git ─────────────────────────────────────────────────────
  repo: [
    { prompt: 'Initialise a git repo in a project where you currently use Claude Code. Make your first commit.', where: 'Terminal', difficulty: 1 },
    { prompt: 'Connect that local repo to a GitHub repo. Push it.', where: 'Terminal + GitHub', difficulty: 1 },
    { prompt: 'Find a project where you should have started a repo but did not. Add one now.', where: 'Anywhere', difficulty: 1 },
    { prompt: 'Read your .gitignore. Add 3 patterns that should be in there but are not.', where: 'Text editor', difficulty: 2 },
    { prompt: 'Clone someone else\'s repo. Browse the commit history. Read the last 5 commit messages.', where: 'Terminal', difficulty: 2 },
  ],
  branch: [
    { prompt: 'Create a feature branch for your next Claude Code task. Do all the work on that branch.', where: 'Terminal', difficulty: 1 },
    { prompt: 'List all your branches. Delete the merged ones.', where: 'Terminal', difficulty: 1 },
    { prompt: 'Set up a branch-naming convention for yourself (feat/, fix/, exp/). Stick to it.', where: 'Anywhere', difficulty: 2 },
    { prompt: 'Switch branches mid-task. Notice if there are uncommitted changes blocking you. Learn from it.', where: 'Terminal', difficulty: 2 },
    { prompt: 'Have two branches with conflicting changes. Resolve the conflict manually.', where: 'Terminal', difficulty: 3 },
  ],
  commit: [
    { prompt: 'After your next Claude Code session, make a commit before doing anything else. Write a real message.', where: 'Terminal', difficulty: 1 },
    { prompt: 'Read your last 10 commit messages. How many would a teammate understand 6 months from now?', where: 'GitHub', difficulty: 1 },
    { prompt: 'Set a personal rule: commit at every milestone, before any risky change.', where: 'Anywhere', difficulty: 1 },
    { prompt: 'Practice writing commit messages in the form "verb-the-thing — short why." Use that style for a week.', where: 'Terminal', difficulty: 2 },
    { prompt: 'Use git log --oneline to see your history compact. Find one commit you would write differently today.', where: 'Terminal', difficulty: 2 },
  ],
  diff: [
    { prompt: 'When Claude shows you a diff, read every line before accepting. Catch one thing you would have missed.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Run git diff before your next commit. Note any unintended changes.', where: 'Terminal', difficulty: 1 },
    { prompt: 'Read someone\'s PR diff before they merge it. Practice the muscle of "what is actually changing here."', where: 'GitHub', difficulty: 2 },
    { prompt: 'Use git diff --staged to see only what you have staged. Make that your pre-commit check.', where: 'Terminal', difficulty: 2 },
    { prompt: 'Find a Claude-generated diff that included something it should not have. Note the pattern so you catch it next time.', where: 'Claude Code', difficulty: 3 },
  ],
  pr: [
    { prompt: 'Open a PR for the next thing Claude builds for you. Treat it as your review checkpoint — even working solo.', where: 'GitHub', difficulty: 1 },
    { prompt: 'Write a PR description in 3 sections: what, why, test plan. Adopt that format for every future PR.', where: 'GitHub', difficulty: 2 },
    { prompt: 'Ask Claude to write the PR description for you. Edit it. Note what it gets right and wrong.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Review a teammate\'s PR. Add at least one comment. Practice the review reflex.', where: 'GitHub', difficulty: 2 },
    { prompt: 'Set up Vercel preview deploys on your PRs. Now every PR has a live URL.', where: 'GitHub + Vercel', difficulty: 3 },
  ],
  merge: [
    { prompt: 'Merge your next PR using "Merge commit" mode. Look at the resulting history. Note the merge commit.', where: 'GitHub', difficulty: 1 },
    { prompt: 'Find a merge commit in a repo you know. Read what was in that branch by looking at the parent commits.', where: 'GitHub', difficulty: 2 },
    { prompt: 'Create a merge conflict on purpose. Resolve it. Note where your changes overlapped.', where: 'Terminal', difficulty: 2 },
    { prompt: 'Compare a merge commit history vs a squash history for the same project. Which is more readable?', where: 'GitHub', difficulty: 3 },
  ],
  squash: [
    { prompt: 'Squash-merge your next PR. Look at the clean single line that appears on main.', where: 'GitHub', difficulty: 1 },
    { prompt: 'On a Claude-assisted PR with 12 micro-commits, squash. Notice how much cleaner main looks.', where: 'GitHub', difficulty: 2 },
    { prompt: 'Set "Squash and merge" as your default merge type in the repo settings.', where: 'GitHub repo settings', difficulty: 2 },
    { prompt: 'Find a PR you should have squashed but did not. Look at the messy history. Promise to squash next time.', where: 'GitHub', difficulty: 1 },
  ],

  // ── Power User ──────────────────────────────────────────────
  subagent: [
    { prompt: 'In your next complex task, ask Claude to spawn a subagent for the research portion. Watch the parallel work happen.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Use a subagent to audit your codebase while you keep working in the main session.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Run two subagents in parallel for two different parts of the same task. Combine the results.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Compare subagent results to doing it yourself sequentially. Was the parallel work actually faster?', where: 'Claude Code', difficulty: 3 },
    { prompt: 'Note when subagents are wrong tool — small tasks where the orchestration overhead exceeds the parallel gain.', where: 'Anywhere', difficulty: 3 },
  ],
  worktree: [
    { prompt: 'Create a worktree for an experimental branch. Work on it in parallel without leaving your main branch.', where: 'Terminal', difficulty: 1 },
    { prompt: 'Use worktrees to A/B test two design directions in the same project. Compare them side by side.', where: 'Terminal', difficulty: 2 },
    { prompt: 'Set up worktree directories with a naming convention (project-name-branchname). Make it findable.', where: 'Terminal', difficulty: 2 },
    { prompt: 'Compare worktree workflow vs git switching branches in one directory. When is each better?', where: 'Terminal', difficulty: 3 },
  ],
  dispatch: [
    { prompt: 'Find one long-running task you would normally babysit. Dispatch it. Check the result later.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Dispatch a research task overnight. Review the results in the morning.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Compare interactive Claude Code vs dispatch for the same task. When does interactive win? When does dispatch?', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Set up a scheduled dispatch task — weekly refactor audit, monthly dependency check.', where: 'Claude Code', difficulty: 3 },
  ],
  hooks: [
    { prompt: 'Add one read-only hook (notification on session start). Confirm it fires.', where: 'Claude Code config', difficulty: 1 },
    { prompt: 'Set up a hook that logs every tool call to a file. Review the log after a long session.', where: 'Claude Code config', difficulty: 2 },
    { prompt: 'Find an existing hook (in awesome-claude-skills or similar) and adapt it for your workflow.', where: 'GitHub', difficulty: 2 },
    { prompt: 'Write a hook that prevents a specific action (e.g. blocks rm -rf in non-trash directories).', where: 'Claude Code config', difficulty: 3 },
  ],
  memory: [
    { prompt: 'Create a CLAUDE.md in your current project. Add: stack, file structure, things to never do.', where: 'Project root', difficulty: 1 },
    { prompt: 'Start a new Claude Code session in that project. Note how much faster Claude orients itself.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Update CLAUDE.md weekly with one new "thing I learned" line. Treat it as a living doc.', where: 'Project root', difficulty: 2 },
    { prompt: 'Compare a project with CLAUDE.md vs without. The difference is usually 5 messages of orientation per session.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Look at someone else\'s CLAUDE.md (from a public repo). Note what they include that you do not.', where: 'GitHub', difficulty: 2 },
  ],

  // ── New Power User concepts ─────────────────────────────────
  fork: [
    { prompt: 'In your next long Claude Code session, fork before trying a risky change. If it goes wrong, return to the fork.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Fork a session to try a completely different approach to the same problem. Compare both forks.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Track tokens used in a forked session vs starting fresh. The savings are usually 30–60%.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Build the habit: fork before any 3+ message detour. Return to the main thread when done.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Try forking from an early point in a long session to "rewind" without losing context completely.', where: 'Claude Code', difficulty: 3 },
  ],
  compaction: [
    { prompt: 'In a long session, run /compact manually. Read what got summarized.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Watch for the auto-compaction signal in long sessions. Note what triggers it.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'After compaction, ask Claude about something from the start of the session. Did it survive the compaction?', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Before a heavy task, manually compact to start with a clean slate but keep prior context.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Compare token usage in a 2-hour session with vs without proactive compaction.', where: 'Claude Code', difficulty: 3 },
  ],
  'plan-mode': [
    { prompt: 'Enable plan mode on your next non-trivial Claude Code task. Read the plan before letting it run.', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Edit the plan Claude proposes — remove one step, add one constraint. Watch how the execution differs.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Compare with-plan vs no-plan execution on the same task. Where did each one win?', where: 'Claude Code', difficulty: 2 },
    { prompt: 'For your next refactor, demand plan mode. Reject the plan if it does not list every file it will touch.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Use plan mode to scope a feature before writing any code. Use the plan as your design doc.', where: 'Claude Code', difficulty: 3 },
  ],
  'claude-md': [
    { prompt: 'Open the CLAUDE.md from one of your active projects. Add 3 lines about "things I am tired of explaining."', where: 'Project root', difficulty: 1 },
    { prompt: 'Add a "How to test changes" section to CLAUDE.md. Save Claude (and yourself) 5 minutes per session.', where: 'Project root', difficulty: 2 },
    { prompt: 'Audit your CLAUDE.md monthly. Cut anything that is outdated.', where: 'Project root', difficulty: 2 },
    { prompt: 'Build a CLAUDE.md template for new projects. Use it as the first file you create.', where: 'Anywhere', difficulty: 2 },
    { prompt: 'Compare your CLAUDE.md to one from an open-source project you respect. What are they doing that you are not?', where: 'GitHub', difficulty: 3 },
  ],
  'auto-accept': [
    { prompt: 'Run a Claude Code session in "ask every time" mode for one hour. Note every prompt — was each one actually useful?', where: 'Claude Code', difficulty: 1 },
    { prompt: 'Configure a profile with auto-accept for low-risk tools (Read, Grep) and ask-every-time for high-risk (Bash, Edit).', where: 'Claude Code config', difficulty: 2 },
    { prompt: 'Try a "trust mode" session on a throwaway branch. See how much faster Claude works when not blocked.', where: 'Claude Code', difficulty: 2 },
    { prompt: 'Set a rule: never run auto-accept on a dirty main branch. Document the rule somewhere visible.', where: 'CLAUDE.md', difficulty: 2 },
    { prompt: 'Compare time-to-done for the same task with full auto-accept vs ask-every-time. Decide where you want to live by default.', where: 'Claude Code', difficulty: 3 },
  ],
}
