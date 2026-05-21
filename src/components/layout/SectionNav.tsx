import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConceptLink {
  id: string
  term: string
}

interface SectionNavProps {
  concepts: ConceptLink[]
  accent: string
}

export function SectionNav({ concepts, accent }: SectionNavProps) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
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
    <nav className="hidden xl:block sticky top-24 self-start w-48 shrink-0">
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
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: accent }}
                  />
                )}
                {!isActive && <div className="w-1 h-1 shrink-0" />}
                {c.term}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
