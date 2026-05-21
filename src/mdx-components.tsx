import type { MDXComponents } from 'mdx/types'
import { ConceptSection } from '@/components/mdx/ConceptSection'
import { Diagram } from '@/components/mdx/Diagram'
import { Analogy } from '@/components/mdx/Analogy'
import { WhyItMatters } from '@/components/mdx/WhyItMatters'
import { RelatedTerms } from '@/components/mdx/RelatedTerms'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ConceptSection,
    Diagram,
    Analogy,
    WhyItMatters,
    RelatedTerms,
  }
}
