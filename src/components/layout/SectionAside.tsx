import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConceptLink {
  id: string
  term: string
}

interface SectionAsideProps {
  concepts: ConceptLink[]
  accent: string
}

export function SectionAside({ concepts, accent }: SectionAsideProps) {
  const [active, setActive] = useState<string>(concepts[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    concepts.forEach(c => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [concepts])

  return (
    <aside className="hidden lg:block sticky top-24 self-start w-52 shrink-0">
      <nav>
        <p
          className="text-xs font-medium tracking-widest uppercase mb-3"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
        >
          In this section
        </p>
        <ul className="space-y-0.5 list-none m-0 p-0">
          {concepts.map(c => {
            const isActive = active === c.id
            return (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="flex items-center gap-2 py-1.5 text-sm transition-colors rounded-md px-2 -mx-2"
                  style={{
                    color: isActive ? 'var(--ink-primary)' : 'var(--ink-muted)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? '500' : '400',
                  }}
                >
                  {isActive ? (
                    <motion.div
                      layoutId="nav-indicator"
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                  ) : (
                    <div className="w-1 h-1 shrink-0" />
                  )}
                  {c.term}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Jump links to the end-of-section blocks */}
        <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
          >
            More
          </p>
          <ul className="space-y-0.5 list-none m-0 p-0">
            {[
              { id: 'knowledge-test', label: 'Knowledge test' },
              { id: 'common-misconceptions', label: 'Misconceptions' },
              { id: 'try-this', label: 'Try this' },
              { id: 'faqs', label: 'FAQs' },
            ].map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block py-1.5 text-sm rounded-md px-2 -mx-2 transition-colors"
                  style={{
                    color: 'var(--ink-muted)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
