import { useState } from 'react'
import { motion } from 'framer-motion'
import { useConceptContext } from '@/context/ConceptContext'

interface VideoLessonProps {
  videoUrl?: string
  keyPoints?: string[]
  exercise?: string
}

function PlayIcon({ size = 40, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="19" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points="16,13 16,27 29,20" fill={color} fillOpacity="0.7" />
    </svg>
  )
}

export function VideoLesson({ videoUrl, keyPoints, exercise }: VideoLessonProps) {
  const { conceptId } = useConceptContext()
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [exerciseText, setExerciseText] = useState('')

  // Pull accent from nearest ConceptSection (via CSS custom property fallback)
  const accent = `var(--accent-${
    conceptId?.includes('prompt') || conceptId?.includes('token') || conceptId?.includes('context') ||
    conceptId?.includes('hallucination') || conceptId?.includes('temperature') || conceptId?.includes('embedding')
      ? 'llm'
      : conceptId?.includes('tool') || conceptId?.includes('agent') || conceptId?.includes('harness') || conceptId?.includes('mcp')
      ? 'agent'
      : conceptId?.includes('skill') || conceptId?.includes('slash') || conceptId?.includes('permission') || conceptId?.includes('settings')
      ? 'claude'
      : conceptId?.includes('repo') || conceptId?.includes('branch') || conceptId?.includes('commit') ||
        conceptId?.includes('diff') || conceptId?.includes('pr') || conceptId?.includes('merge') || conceptId?.includes('squash')
      ? 'git'
      : 'power'
  })`

  const toggle = (i: number) =>
    setChecked(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      {/* Section label */}
      <p
        className="text-xs font-medium tracking-widest uppercase mb-3"
        style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
      >
        Video lesson
      </p>

      {/* Two-column shell */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
      >
        <div className="flex flex-col md:flex-row">

          {/* ── Left: Video panel ─────────────────────────── */}
          <div className="md:w-[55%] flex-shrink-0">
            {videoUrl ? (
              /* Actual video embed */
              <div
                className="relative w-full"
                style={{ paddingTop: '56.25%' /* 16:9 */ }}
              >
                {videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') ? (
                  <video
                    src={videoUrl}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ borderRadius: 0 }}
                  />
                ) : (
                  <iframe
                    src={videoUrl}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                  />
                )}
              </div>
            ) : (
              /* Placeholder */
              <div
                className="flex flex-col items-center justify-center gap-4 py-16 px-8"
                style={{
                  background: `${accent}08`,
                  borderRight: '1px solid var(--border)',
                  minHeight: '240px',
                }}
              >
                <PlayIcon color={accent} size={52} />
                <div className="text-center">
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: accent, fontFamily: 'var(--font-body)' }}
                  >
                    Video lesson
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    AI-generated explainer coming soon
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    border: `1px dashed ${accent}`,
                    color: accent,
                    fontFamily: 'var(--font-mono)',
                    opacity: 0.6,
                  }}
                >
                  Synthesia · HeyGen · D-ID
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Interactive panel ───────────────────── */}
          <div
            className="md:w-[45%] flex flex-col p-6 gap-6"
            style={{ borderLeft: '1px solid var(--border)' }}
          >

            {/* Key points checklist */}
            {keyPoints && keyPoints.length > 0 && (
              <div>
                <p
                  className="text-xs font-medium tracking-widest uppercase mb-3"
                  style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
                >
                  Key points
                </p>
                <ul className="space-y-2.5">
                  {keyPoints.map((point, i) => (
                    <li key={i}>
                      <button
                        onClick={() => toggle(i)}
                        className="flex items-start gap-3 w-full text-left group"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        {/* Checkbox */}
                        <span
                          className="mt-0.5 shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all"
                          style={{
                            background: checked[i] ? accent : 'transparent',
                            border: `1.5px solid ${checked[i] ? accent : 'var(--border)'}`,
                          }}
                        >
                          {checked[i] && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span
                          className="text-sm leading-snug transition-colors"
                          style={{
                            color: checked[i] ? 'var(--ink-muted)' : 'var(--ink-secondary)',
                            textDecoration: checked[i] ? 'line-through' : 'none',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {point}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Try it yourself */}
            {exercise && (
              <div className="flex flex-col flex-1">
                <p
                  className="text-xs font-medium tracking-widest uppercase mb-2"
                  style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
                >
                  Try it yourself
                </p>
                <p
                  className="text-xs mb-3 leading-relaxed"
                  style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {exercise}
                </p>
                <textarea
                  placeholder="Write your answer here…"
                  value={exerciseText}
                  onChange={e => setExerciseText(e.target.value)}
                  rows={4}
                  className="w-full flex-1 resize-none rounded-lg text-sm p-3 transition-all"
                  style={{
                    background: 'var(--bg-base)',
                    border: `1px solid ${exerciseText ? accent : 'var(--border)'}`,
                    color: 'var(--ink-primary)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    lineHeight: 1.6,
                  }}
                />
                {exerciseText.length > 10 && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: accent, fontFamily: 'var(--font-body)' }}
                  >
                    ✓ Nice — save this for your notes
                  </p>
                )}
              </div>
            )}

            {/* Fallback if no content at all */}
            {!keyPoints?.length && !exercise && (
              <p
                className="text-sm italic"
                style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
              >
                Key points and exercises coming soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
