/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { MDXComponents } from 'mdx/types'
  const component: (props: { components?: MDXComponents; [key: string]: unknown }) => JSX.Element
  export const frontmatter: {
    id: string
    term: string
    category: 'llm' | 'agent' | 'claude' | 'git' | 'power'
    order: number
    oneLiner: string
    analogy: string
    whyItMatters: string
    related: string[]
  }
  export default component
}
