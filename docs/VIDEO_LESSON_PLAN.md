# Video Lesson — Implementation Plan

Standalone design doc. The text-based course is the primary path. This plan
describes how to add an optional **AI-generated video walkthrough** per concept
so that learners who'd rather watch than read have a parallel path.

This is intentionally not implemented in the current codebase — drop it in
later, or build it in a separate place.

---

## Goal

Each concept (Prompt, Token, Context Window, etc.) gets a short AI-narrated
video (Synthesia / HeyGen / D-ID style) shown at the top of the concept as an
opt-in alternative to reading.

The text content stays exactly as it is. The video is framed:

> **Prefer to watch?** A 3-minute AI-narrated walkthrough. Or just scroll down to read.

If no video URL is supplied yet, a polished placeholder block is shown so the
layout is consistent and learners know it's coming.

---

## UX Pattern

### Desktop (≥ 768px) — two-column

```
┌──────────────────────────────────┬──────────────────────────────┐
│                                  │  KEY POINTS                  │
│        Video player              │  ☐ Point 1                   │
│        (16:9, iframe or          │  ☐ Point 2                   │
│         <video> element)         │  ☐ Point 3                   │
│                                  │                              │
│                                  │  TRY IT YOURSELF             │
│                                  │  ┌────────────────────────┐  │
│                                  │  │ textarea               │  │
│                                  │  └────────────────────────┘  │
└──────────────────────────────────┴──────────────────────────────┘
        55% width                            45% width
```

### Mobile — stacked

Video block on top, interactive panel below.

### Position in the page

Top of each concept, immediately after the heading area, **before** the prose.
Learners see the choice up front: watch or read.

---

## Component API

`src/components/mdx/VideoLesson.tsx`

```ts
interface VideoLessonProps {
  videoUrl?: string          // Synthesia/HeyGen iframe URL or direct .mp4
  keyPoints?: string[]       // 3–5 bullet takeaways shown in right panel
  exercise?: string          // "Try it" prompt shown below key points
}
```

### Video panel logic

- If `videoUrl` ends in `.mp4` / `.webm` → render `<video src controls>` tag
- Otherwise → render `<iframe>` with `allow="autoplay; fullscreen; picture-in-picture"`
- Wrap in a `padding-top: 56.25%` container for 16:9 aspect ratio
- If no `videoUrl` → render the placeholder (play icon, "AI-generated explainer coming soon", "Synthesia · HeyGen · D-ID" badge)

### Interactive panel logic

- **Key points** list — each item is a button that toggles a checkbox state.
  Local component state (`useState<Record<number, boolean>>`). Resets on reload.
  Checked items get strike-through styling and muted colour.
- **Try it yourself** textarea — controlled, local state. When user types > 10
  chars, show a soft confirmation ("✓ Nice — save this for your notes") in the
  concept accent colour.

### Accent colour

Pulled from `useConceptContext()` to match the section (LLM = terracotta,
Agents = slate, Claude Code = green, Git = violet, Power = amber). The accent
shows in:

- Placeholder background tint (`${accent}08`)
- Dashed border on the platform-name badge
- Checkbox fill when checked
- Confirmation message on the textarea

---

## MDX usage

```mdx
<ConceptSection id="prompt" term="Prompt" category="llm" oneLiner="…">

<VideoLesson
  videoUrl="https://share.synthesia.io/embed/videos/abc123"
  keyPoints={[
    "A prompt is the complete input you give the model — question, context, constraints, format instructions",
    "Quality of output is always capped by the quality of the input",
    "A vague prompt produces vague work — same as a vague design brief",
    "You don't need to understand the model's internals — think clearly about what you actually want",
    "Prompting is a craft skill, not a technical one"
  ]}
  exercise="Take a task you've already used Claude for. Rewrite that prompt with: (1) a specific role or context, (2) three explicit constraints, (3) an example of the output format you want. Compare the results."
/>

[ prose paragraphs continue as normal ]
…
</ConceptSection>
```

`VideoLesson` must also be added to the `mdxComponents` map in `src/pages/SectionPage.tsx`:

```ts
import { VideoLesson } from '@/components/mdx/VideoLesson'

const mdxComponents = {
  ConceptSection, Diagram, Analogy, WhyItMatters, RelatedTerms,
  VideoLesson,  // ← add this
}
```

---

## Styling notes

- Outer shell: `rounded-2xl` border + `var(--bg-card)` background
- Two-column flex: `flex flex-col md:flex-row` (`md:` is the 768px Tailwind breakpoint)
- Internal divider: `border-l` between the two columns
- Vertical rhythm: `my-8` between the heading and the video block
- Use `var(--font-body)` for everything except the play-icon-area headline (which can use `var(--font-display)` if you want more polish)

---

## Video generation workflow

For each concept, the script is short — typically 30 to 90 seconds. The shape:

1. **Hook** (5s) — the one-liner from the MDX frontmatter
2. **Definition** (15–25s) — paraphrase the first prose paragraph
3. **Analogy** (15–20s) — verbalise the `<Analogy>` block
4. **Why it matters** (15–20s) — paraphrase the `<WhyItMatters>` block
5. **Outro** (5s) — pointer to the next concept

### Tool choice

- **Synthesia** (`https://www.synthesia.io`) — premium AI avatars, paid plans. Best for a polished course feel. Provides `https://share.synthesia.io/embed/videos/{id}` URLs.
- **HeyGen** (`https://www.heygen.com`) — comparable to Synthesia. Slightly cheaper. Also gives embeddable share links.
- **D-ID** (`https://www.d-id.com`) — cheapest option, but the avatars look more obviously AI. Good for a draft pass.

### Iteration approach

1. Generate scripts for all 27 concepts at once (use Claude / ChatGPT with the MDX file as input)
2. Pick one avatar/voice and stick with it across the whole course — consistency matters
3. Generate one concept end-to-end and review it before producing the rest
4. Add the URL to the corresponding `<VideoLesson videoUrl="…" />` in the MDX

---

## Estimated effort

| Task | Effort |
|------|--------|
| Build the `VideoLesson` component | 2–3 hours |
| Wire into MDX pipeline + register in SectionPage | 15 min |
| Write 27 video scripts | 4–6 hours |
| Generate & review 27 AI videos | 6–10 hours (mostly waiting on renders) |
| Polish + QA across browsers | 1–2 hours |
| **Total** | **~2 days of focused work** |

---

## Why this isn't in the codebase right now

Per the user's decision: keep the text-based course as the focused deliverable
for now. Build the video feature elsewhere — possibly as a v2 of this site,
possibly as a separate companion project, possibly as an embeddable widget that
gets dropped in later.

The component design here is intentionally simple and self-contained so it can
move between codebases without dragging dependencies along.
