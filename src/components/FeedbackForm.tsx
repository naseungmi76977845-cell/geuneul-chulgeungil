import { useState, type FormEvent } from 'react'
import type { Course } from '../data/courses'
import { saveFeedback, type Feeling, type Reuse } from '../lib/storage'

type Props = {
  course: Course
  onSubmitted: () => void
  onTryAnother: () => void
}

const feelingOptions: { value: Feeling; label: string }[] = [
  { value: 'good', label: '좋았어요' },
  { value: 'okay', label: '보통이에요' },
  { value: 'disappointed', label: '아쉬웠어요' },
]

const reuseOptions: { value: Reuse; label: string }[] = [
  { value: 'yes', label: '네' },
  { value: 'maybe', label: '글쎄요' },
  { value: 'no', label: '아니요' },
]

export function FeedbackForm({ course, onSubmitted, onTryAnother }: Props) {
  const [feeling, setFeeling] = useState<Feeling | null>(null)
  const [reuse, setReuse] = useState<Reuse | null>(null)
  const [comment, setComment] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!feeling || !reuse) {
      setError('오늘 코스 소감과 재이용 의사를 선택해 주세요.')
      return
    }
    saveFeedback({
      courseId: course.id,
      courseName: course.name,
      feeling,
      reuse,
      comment: comment.trim(),
    })
    setError('')
    setSaved(true)
    onSubmitted()
  }

  if (saved) {
    return (
      <section className="panel panel--focus text-center">
        <p className="eyebrow">후기 저장 완료</p>
        <h2 className="section-title mt-2">체험 의견이 이 기기에 저장됐어요</h2>
        <p className="mt-3 text-sm text-[var(--forest-soft)]">
          브라우저에만 저장되며, 공모전 시연용으로 활용할 수 있어요.
        </p>
        <button type="button" className="btn btn--primary mt-8 w-full" onClick={onTryAnother}>
          다른 코스 체험하기
        </button>
      </section>
    )
  }

  return (
    <section className="panel panel--focus">
      <p className="eyebrow">{course.name} 체험 후기</p>
      <h2 className="section-title mt-2">오늘 이 코스는 어땠나요?</h2>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-sm font-medium text-[var(--forest)]">소감</legend>
          <div className="mt-3 grid gap-2">
            {feelingOptions.map((opt) => (
              <label key={opt.value} className={`choice ${feeling === opt.value ? 'choice--on' : ''}`}>
                <input
                  type="radio"
                  name="feeling"
                  value={opt.value}
                  checked={feeling === opt.value}
                  onChange={() => setFeeling(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-[var(--forest)]">다음에도 이용하고 싶나요?</legend>
          <div className="mt-3 grid gap-2">
            {reuseOptions.map((opt) => (
              <label key={opt.value} className={`choice ${reuse === opt.value ? 'choice--on' : ''}`}>
                <input
                  type="radio"
                  name="reuse"
                  value={opt.value}
                  checked={reuse === opt.value}
                  onChange={() => setReuse(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm font-medium text-[var(--forest)]">한 줄 의견 (선택)</span>
          <textarea
            className="field mt-2"
            rows={3}
            maxLength={200}
            placeholder="좋았던 점이나 아쉬운 점을 적어 주세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>

        {error && <p className="text-sm text-[#9a3b2f]">{error}</p>}

        <button type="submit" className="btn btn--primary w-full">
          후기 제출
        </button>
      </form>
    </section>
  )
}
