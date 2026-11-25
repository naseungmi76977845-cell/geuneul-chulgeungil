import type { Course } from '../data/courses'
import { BenchIcon, LeafIcon, StairsIcon } from './Icons'

type Props = {
  course: Course
  onSelect: (id: Course['id']) => void
}

export function CourseCard({ course, onSelect }: Props) {
  const isShade = course.accent === 'shade'

  return (
    <button
      type="button"
      onClick={() => onSelect(course.id)}
      className={`course-card group w-full text-left ${isShade ? 'course-card--shade' : 'course-card--bench'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`course-icon ${isShade ? 'course-icon--shade' : 'course-icon--bench'}`}>
            {course.icon === 'leaf' ? <LeafIcon /> : <BenchIcon />}
          </span>
          <div>
            <p className="font-display text-xl text-[var(--forest)]">{course.name}</p>
            <p className="mt-0.5 text-sm text-[var(--forest-soft)]">{course.tagline}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-[var(--forest)]">
          {course.totalMinutes}분
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[var(--ink)]">{course.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {course.restMinutes > 0 ? (
          <span className="chip">걷기 {course.walkMinutes}분 · 휴식 {course.restMinutes}분</span>
        ) : (
          <span className="chip">걷기 {course.walkMinutes}분</span>
        )}
        <span className="chip inline-flex items-center gap-1">
          {course.hasStairs ? (
            <>
              <StairsIcon className="h-3.5 w-3.5" /> 계단 있음
            </>
          ) : (
            '계단 없음'
          )}
        </span>
        <span className="chip">벤치 {course.benchCount}곳</span>
      </div>

      <p className="mt-4 text-sm text-[var(--forest-mid)]">
        <span className="font-medium">체험 </span>
        {course.activity}
      </p>

      <p className="mt-4 text-sm font-medium text-[var(--forest)] group-hover:underline">
        코스 상세 보기 →
      </p>
    </button>
  )
}
