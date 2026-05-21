import { useParams, Navigate } from 'react-router-dom'
import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getSectionById, sections } from '@/data/sections'
import { faqs } from '@/data/faqs'
import { quizzes } from '@/data/quizzes'
import { SectionNav } from '@/components/layout/SectionNav'
import { GuidedNext } from '@/components/layout/GuidedNext'
import { FAQSection } from '@/components/mdx/FAQSection'
import { Quiz } from '@/components/mdx/Quiz'
import { ConceptSection } from '@/components/mdx/ConceptSection'
import { Diagram } from '@/components/mdx/Diagram'
import { Analogy } from '@/components/mdx/Analogy'
import { WhyItMatters } from '@/components/mdx/WhyItMatters'
import { RelatedTerms } from '@/components/mdx/RelatedTerms'
import { TaskList } from '@/components/mdx/TaskList'
import { Confusions } from '@/components/section/Confusions'

type MDXModule = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: { components?: Record<string, any> }) => React.ReactElement
  frontmatter: {
    id: string
    term: string
    category: string
    order: number
    oneLiner: string
    related: string[]
  }
}

/* Glob all MDX modules — Vite resolves these at build time */
const allModules = import.meta.glob<MDXModule>('/src/content/**/*.mdx', { eager: true })

const mdxComponents = {
  ConceptSection,
  Diagram,
  Analogy,
  WhyItMatters,
  RelatedTerms,
  TaskList,
}

export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const section = getSectionById(sectionId ?? '')

  if (!section) return <Navigate to="/" replace />

  const concepts = useMemo(() => {
    const pattern = `/src/content/${sectionId}/`
    return Object.entries(allModules)
      .filter(([path]) => path.startsWith(pattern))
      .map(([, mod]) => mod)
      .sort((a, b) => (a.frontmatter?.order ?? 0) - (b.frontmatter?.order ?? 0))
  }, [sectionId])

  const navLinks = concepts.map(m => ({
    id: m.frontmatter?.id ?? '',
    term: m.frontmatter?.term ?? '',
  }))

  const sectionFaqs = faqs[sectionId ?? ''] ?? []
  const sectionQuiz = quizzes[sectionId ?? ''] ?? []
  const nextSection = sections.find(s => s.id === section.nextId)

  // Scroll to hash on load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      window.scrollTo(0, 0)
    }
  }, [sectionId])

  return (
    <div className="flex gap-8 max-w-5xl mx-auto px-6 py-12">
      {/* Sticky left nav */}
      <SectionNav concepts={navLinks} accent={section.accent} />

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-14 pb-8"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: `${section.accent}14`, color: section.accent }}
          >
            Section {section.order} of 5
          </div>
          <h1
            className="mb-3"
            style={{ fontSize: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}
          >
            {section.title}
          </h1>
          <p style={{ color: 'var(--ink-secondary)' }}>{section.description}</p>
          <p
            className="mt-2 text-sm"
            style={{ color: 'var(--ink-muted)' }}
          >
            {concepts.length} concepts · scroll through at your own pace
          </p>
        </motion.div>

        {/* Common confusions — shown BEFORE concepts to head off wrong mental models */}
        <Confusions sectionId={sectionId ?? ''} accent={section.accent} />

        {/* Concepts — pass components directly, no MDXProvider needed */}
        <div className="space-y-0">
          {concepts.map(({ default: Content, frontmatter: fm }) => (
            <Content key={fm?.id} components={mdxComponents} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-16" style={{ borderTop: '1px solid var(--border)' }} />

        {/* Quiz */}
        {sectionQuiz.length > 0 && (
          <Quiz questions={sectionQuiz} sectionAccent={section.accent} />
        )}

        {/* FAQs */}
        {sectionFaqs.length > 0 && (
          <FAQSection faqs={sectionFaqs} accent={section.accent} />
        )}

        {/* Next section */}
        {nextSection && <GuidedNext next={nextSection} />}
      </main>
    </div>
  )
}
