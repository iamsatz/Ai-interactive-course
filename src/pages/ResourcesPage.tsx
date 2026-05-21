import { motion } from 'framer-motion'

const resources = [
  {
    group: 'Start here',
    items: [
      {
        title: 'Get Claude Code Desktop',
        url: 'https://anthropic.com',
        why: 'The tool this course is built around. Install it first — everything else makes more sense once you\'ve seen a real session running.',
        note: 'Free tier available. Pro (~$20/mo) unlocks heavier use and longer sessions.',
      },
    ],
  },
  {
    group: 'How LLMs work',
    items: [
      {
        title: 'Generative AI — Financial Times',
        url: 'https://ig.ft.com/generative-ai/',
        why: 'The best visual explanation of how language models actually work — tokens, attention, embeddings — written for non-engineers. Read this before anything else. It answers the "but how does it actually know?" question.',
        note: '~30 min. Interactive graphics throughout.',
      },
      {
        title: 'Andrej Karpathy — Intro to Large Language Models',
        url: 'https://youtu.be/zjkBMFhNj_g',
        why: 'A 1-hour YouTube lecture by one of the people who built these systems. Surprisingly accessible. Gives you the mental model that makes everything else click.',
        note: '1 hr video. Skip to 12 min if you want the practical half first.',
      },
    ],
  },
  {
    group: 'Claude Code — go deeper',
    items: [
      {
        title: 'Introducing Agent Skills',
        url: 'https://claude.ai/blog/skills',
        why: 'The official introduction to Skills — the mechanism that lets you encode your own workflow into a slash command. Once you understand this, Claude stops being a chat tool and becomes a programmable assistant.',
        note: 'Official Anthropic blog post.',
      },
      {
        title: 'Anthropic Claude Cookbooks — Agent Patterns',
        url: 'https://github.com/anthropics/claude-cookbooks/tree/main/patterns/agents',
        why: 'Working, copy-paste-able agent patterns from Anthropic\'s own team. Useful when you want to see how tool use, memory, and multi-step planning look in actual code.',
        note: 'GitHub repo. Concrete code examples.',
      },
      {
        title: 'awesome-claude-skills',
        url: 'https://github.com/travisvn/awesome-claude-skills',
        why: 'A community-maintained index of Skills, tools, and workflows. Good for finding patterns other designers and developers have already solved — you don\'t have to build from scratch.',
        note: 'Community maintained. Updated regularly.',
      },
      {
        title: 'Model Context Protocol Spec',
        url: 'https://modelcontextprotocol.io',
        why: 'MCP is how Claude connects to external tools — Figma, Notion, GitHub, your local files. You don\'t need to read the full spec, but skimming the overview explains why every AI tool is now "adding MCP support."',
        note: 'Official spec site. Overview section is enough to start.',
      },
    ],
  },
  {
    group: 'Designer × AI',
    items: [
      {
        title: 'People + AI Guidebook — Google PAIR',
        url: 'https://pair.withgoogle.com/guidebook',
        why: 'The closest thing design has to a canonical reference for AI UX. Covers mental models, error handling, feedback loops, and trust — the problems that come up the moment you ship something AI-powered.',
        note: 'Free. Patterns, principles, worked examples.',
      },
      {
        title: 'The Shape of AI',
        url: 'https://shapeof.ai',
        why: 'A pattern library specifically for AI interfaces — streaming responses, confidence indicators, disambiguation flows. Bookmarkable for when you\'re designing something and need to see how others solved the same interaction.',
        note: 'Pattern library. Visual and annotated.',
      },
      {
        title: 'Prompts should be designed — not engineered',
        url: 'https://uxdesign.cc/prompts-should-be-designed-not-engineered-45838a9c3564',
        why: 'The core argument of this course in article form. Treats prompts as design artifacts with the same craft concerns as copy, flows, or interfaces. A useful frame to share with engineering colleagues.',
        note: 'UX Collective essay. ~10 min read.',
      },
      {
        title: 'Design Engineers — Maggie Appleton',
        url: 'https://maggieappleton.com/design-engineers',
        why: 'A field guide to the hybrid designer-who-codes role — the exact space this course is trying to help you occupy more confidently. Helps you name and articulate what you\'re learning to do.',
        note: 'Essay by Maggie Appleton. Essential reading.',
      },
      {
        title: 'Machine Learning + Design',
        url: 'https://machinelearning.design',
        why: 'A curated reading list at the ML/design intersection — papers, essays, and talks that don\'t usually show up in design feeds. Good for going deeper once the vocabulary from this course feels solid.',
        note: 'Curated link list. Updated periodically.',
      },
    ],
  },
  {
    group: 'Official docs',
    items: [
      {
        title: 'Anthropic Docs',
        url: 'https://docs.anthropic.com',
        why: 'The authoritative reference for prompting best practices, model capabilities, and the API. The "Prompt Engineering" section is written for humans — not just developers. Bookmark the Claude model comparison page.',
        note: 'Docs site. Prompting guide is the most useful section.',
      },
    ],
  },
]

export function ResourcesPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p
          className="text-xs font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
        >
          Where to go from here
        </p>
        <h1
          className="mb-4"
          style={{ fontSize: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}
        >
          Resources
        </h1>
        <p className="mb-12 text-base" style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-body)' }}>
          Curated links for going deeper — each one chosen because it actually teaches something, not just explains it.
        </p>

        <div className="space-y-14">
          {resources.map((group, gi) => (
            <motion.div key={gi}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: gi * 0.05 }}
            >
              <p
                className="text-xs font-medium tracking-widest uppercase mb-5"
                style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
              >
                {group.group}
              </p>
              <div className="space-y-4">
                {group.items.map((item, ii) => (
                  <a
                    key={ii}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-5 rounded-xl transition-all hover:shadow-md group"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                    }}
                  >
                    {/* Title */}
                    <span
                      className="font-medium text-base group-hover:underline mb-2"
                      style={{ color: 'var(--ink-primary)', fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </span>

                    {/* Why it's useful */}
                    <span
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-body)' }}
                    >
                      {item.why}
                    </span>

                    {/* Footer row — note + URL */}
                    <div className="flex items-center justify-between gap-4 mt-auto pt-3"
                      style={{ borderTop: '1px solid var(--border)' }}>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
                      >
                        {item.note}
                      </span>
                      <span
                        className="text-xs shrink-0"
                        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}
                      >
                        {item.url.replace(/^https?:\/\//, '').replace(/\/.+/, '/…')}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm italic" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-display)' }}>
            Workshop material by{' '}
            <a href="https://x.com/arjunphlox" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--ink-secondary)' }}>Arjun Phlox</a>.
            This site is a teaching layer — not a replacement.
            Go read the FT explainer.
          </p>
        </div>
      </motion.div>
    </main>
  )
}
