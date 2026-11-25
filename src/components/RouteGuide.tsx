import type { Course } from '../data/courses'
import { BenchIcon, StairsIcon } from './Icons'

type Props = {
  course: Course
}

export function RouteGuide({ course }: Props) {
  return (
    <ol className="route-guide">
      {course.stops.map((stop, index) => {
        const benchCount = stop.tags.filter((t) => t === 'bench').length
        const hasStairs = stop.tags.includes('stairs')
        const isLast = index === course.stops.length - 1

        return (
          <li key={stop.id} className="route-stop">
            <div className="route-rail" aria-hidden="true">
              <span className="route-dot" />
              {!isLast && <span className="route-line" />}
            </div>
            <div className="route-body">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-[var(--forest)]">{stop.name}</p>
                {hasStairs && (
                  <span className="tag-pill tag-pill--stairs">
                    <StairsIcon /> 계단
                  </span>
                )}
                {benchCount > 0 && (
                  <span className="tag-pill tag-pill--bench">
                    <BenchIcon className="h-3.5 w-3.5" /> 벤치 {benchCount}곳
                  </span>
                )}
              </div>
              {stop.note && <p className="mt-1 text-sm text-[var(--forest-soft)]">{stop.note}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
