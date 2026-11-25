import { useEffect, useRef, useState } from 'react'
import { EXPERIENCE_SECONDS } from '../data/courses'

type Props = {
  activity: string
  courseName: string
  onComplete: () => void
  onBack: () => void
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function ExperienceTimer({ activity, courseName, onComplete, onBack }: Props) {
  const [remaining, setRemaining] = useState(EXPERIENCE_SECONDS)
  const [paused, setPaused] = useState(false)
  const endedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (paused || endedRef.current) return
    if (remaining <= 0) {
      endedRef.current = true
      onCompleteRef.current()
      return
    }
    const id = window.setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [paused, remaining])

  const progress = ((EXPERIENCE_SECONDS - remaining) / EXPERIENCE_SECONDS) * 100

  return (
    <section className="panel panel--focus">
      <button type="button" className="back-link" onClick={onBack}>
        ← 코스 안내로
      </button>

      <p className="eyebrow">{courseName} · 3분 체험</p>
      <h2 className="section-title mt-2">지금, 숲 3분</h2>
      <p className="mt-3 text-[var(--ink)] leading-relaxed">{activity}</p>

      <div className="timer-ring mt-8" style={{ ['--progress' as string]: `${progress}%` }}>
        <div className="timer-inner">
          <p className="font-display text-4xl tracking-wide text-[var(--forest)]">
            {formatTime(remaining)}
          </p>
          <p className="mt-1 text-sm text-[var(--forest-soft)]">
            {paused ? '일시정지' : remaining === 0 ? '완료' : '진행 중'}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="btn btn--ghost flex-1"
          onClick={() => setPaused((p) => !p)}
          disabled={remaining === 0}
        >
          {paused ? '재개' : '일시정지'}
        </button>
        <button
          type="button"
          className="btn btn--primary flex-1"
          onClick={() => {
            endedRef.current = true
            onComplete()
          }}
        >
          체험 완료
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-[var(--forest-soft)]">
        시연 중에는 체험 완료로 바로 후기 화면을 볼 수 있어요.
      </p>
    </section>
  )
}
