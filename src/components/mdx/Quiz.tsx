import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion } from '@/data/quizzes'

interface QuizProps {
  questions: QuizQuestion[]
  sectionAccent?: string
}

export function Quiz({ questions, sectionAccent = 'var(--accent-llm)' }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [done, setDone] = useState(false)

  const allAnswered = questions.every(q => q.id in answers)
  const score = questions.filter(q => answers[q.id] === q.correctIndex).length

  function select(qId: string, idx: number) {
    if (revealed[qId]) return
    setAnswers(prev => ({ ...prev, [qId]: idx }))
    setRevealed(prev => ({ ...prev, [qId]: true }))
  }

  return (
    <div
      className="mt-12 mb-4 rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid var(--border)', backgroundColor: `${sectionAccent}0a` }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: sectionAccent }}
        >
          ?
        </div>
        <div>
          <p className="font-medium text-sm m-0" style={{ color: 'var(--ink-primary)' }}>
            Knowledge check
          </p>
          <p className="text-xs m-0" style={{ color: 'var(--ink-muted)' }}>
            {questions.length} question{questions.length !== 1 ? 's' : ''} — no pressure, just reinforcement
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {questions.map((q, qi) => {
          const chosen = answers[q.id]
          const isRevealed = revealed[q.id]
          const isCorrect = chosen === q.correctIndex

          return (
            <div key={q.id}>
              <p className="font-medium mb-4 m-0" style={{ color: 'var(--ink-primary)' }}>
                <span style={{ color: 'var(--ink-muted)', marginRight: '0.5rem' }}>{qi + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  let bg = 'var(--bg-base)'
                  let border = 'var(--border)'
                  let color = 'var(--ink-secondary)'

                  if (isRevealed) {
                    if (i === q.correctIndex) {
                      bg = '#4A7C5914'; border = '#4A7C59'; color = '#2d5a38'
                    } else if (i === chosen && !isCorrect) {
                      bg = '#D4622A14'; border = '#D4622A'; color = '#8b3a14'
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => select(q.id, i)}
                      disabled={isRevealed}
                      className="w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-150 cursor-pointer disabled:cursor-default"
                      style={{ backgroundColor: bg, border: `1px solid ${border}`, color, fontFamily: 'var(--font-body)' }}
                    >
                      <span className="mr-2 font-mono text-xs" style={{ color: 'var(--ink-muted)' }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 px-4 py-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: isCorrect ? '#4A7C590d' : '#D4622A0d',
                      border: `1px solid ${isCorrect ? '#4A7C5940' : '#D4622A40'}`,
                      color: 'var(--ink-secondary)',
                    }}
                  >
                    <span className="font-medium" style={{ color: isCorrect ? '#4A7C59' : '#D4622A' }}>
                      {isCorrect ? 'Correct. ' : 'Not quite. '}
                    </span>
                    {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Score */}
      <AnimatePresence>
        {allAnswered && !done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 pb-6 flex items-center justify-between"
          >
            <p className="text-sm m-0" style={{ color: 'var(--ink-secondary)' }}>
              {score}/{questions.length} correct
            </p>
            <button
              onClick={() => setDone(true)}
              className="text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
              style={{ backgroundColor: sectionAccent, color: '#fff', fontFamily: 'var(--font-body)' }}
            >
              Continue reading →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
