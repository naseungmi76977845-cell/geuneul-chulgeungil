import { useEffect, useRef, useState } from 'react'
import { CourseCard } from './components/CourseCard'
import { ExperienceTimer } from './components/ExperienceTimer'
import { FeedbackForm } from './components/FeedbackForm'
import { BenchIcon, LeafIcon, TreeIcon } from './components/Icons'
import { RouteGuide } from './components/RouteGuide'
import {
  BASE_MINUTES,
  courses,
  getCourse,
  ROUTE_LABEL,
  type Course,
} from './data/courses'

type Screen = 'browse' | 'detail' | 'experience' | 'feedback'

export default function App() {
  const [screen, setScreen] = useState<Screen>('browse')
  const [selectedId, setSelectedId] = useState<Course['id'] | null>(null)
  const coursesRef = useRef<HTMLElement | null>(null)

  const selected = selectedId ? getCourse(selectedId) : null

  useEffect(() => {
    if (screen !== 'browse') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [screen, selectedId])

  function scrollToCourses() {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function openCourse(id: Course['id']) {
    setSelectedId(id)
    setScreen('detail')
  }

  function resetToCourses() {
    setSelectedId(null)
    setScreen('browse')
    requestAnimationFrame(() => {
      coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  if (screen === 'detail' && selected) {
    const extra = selected.totalMinutes - BASE_MINUTES
    return (
      <div className="app-shell">
        <main className="page">
          <section className="panel">
            <button type="button" className="back-link" onClick={resetToCourses}>
              ← 코스 선택으로
            </button>

            <div className="mt-4 flex items-center gap-3">
              <span
                className={`course-icon ${
                  selected.accent === 'shade' ? 'course-icon--shade' : 'course-icon--bench'
                }`}
              >
                {selected.icon === 'leaf' ? <LeafIcon /> : <BenchIcon />}
              </span>
              <div>
                <p className="eyebrow">체험용 예시 코스</p>
                <h1 className="font-display text-3xl text-[var(--forest)]">{selected.name}</h1>
              </div>
            </div>

            <p className="mt-3 text-[var(--ink)]">{selected.tagline}</p>

            <dl className="stat-grid mt-6">
              <div>
                <dt>총 소요시간</dt>
                <dd>{selected.totalMinutes}분</dd>
              </div>
              <div>
                <dt>평소 대비</dt>
                <dd>+{extra}분</dd>
              </div>
              <div>
                <dt>계단</dt>
                <dd>{selected.hasStairs ? '있음' : '없음'}</dd>
              </div>
              <div>
                <dt>벤치</dt>
                <dd>{selected.benchCount}곳</dd>
              </div>
            </dl>

            {selected.restMinutes > 0 && (
              <p className="mt-4 text-sm text-[var(--forest-mid)]">
                걷기 {selected.walkMinutes}분 + 휴식 {selected.restMinutes}분
              </p>
            )}

            <h2 className="mt-8 font-display text-xl text-[var(--forest)]">경로 안내</h2>
            <p className="mt-1 text-sm text-[var(--forest-soft)]">{ROUTE_LABEL}</p>
            <div className="mt-4">
              <RouteGuide course={selected} />
            </div>

            <div className="activity-box mt-8">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--forest-soft)]">
                3분 체험 활동
              </p>
              <p className="mt-2 text-[var(--ink)] leading-relaxed">{selected.activity}</p>
            </div>

            <button
              type="button"
              className="btn btn--primary mt-8 w-full"
              onClick={() => setScreen('experience')}
            >
              3분 체험 시작
            </button>
          </section>
        </main>
      </div>
    )
  }

  if (screen === 'experience' && selected) {
    return (
      <div className="app-shell">
        <main className="page">
          <ExperienceTimer
            activity={selected.activity}
            courseName={selected.name}
            onBack={() => setScreen('detail')}
            onComplete={() => setScreen('feedback')}
          />
        </main>
      </div>
    )
  }

  if (screen === 'feedback' && selected) {
    return (
      <div className="app-shell">
        <main className="page">
          <FeedbackForm
            course={selected}
            onSubmitted={() => {}}
            onTryAnother={resetToCourses}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src="/hero-shade.jpg" alt="" className="hero-photo" />
          <div className="hero-veil" />
        </div>
        <div className="hero-copy">
          <p className="brand-mark">
            <TreeIcon className="h-5 w-5" />
            그늘 출근길
          </p>
          <h1 className="hero-title">매일 가는 길에, 숲 3분.</h1>
          <p className="hero-lead">
            늘 걷던 길에서 나무 그늘을 따라 걸어보세요. 잠시 쉬고 싶은 날엔 나무 아래 벤치에
            앉아도 좋아요. 출근길과 등굣길 사이, 내게 맞는 3분을 골라보세요.
          </p>
          <button type="button" className="btn btn--light mt-8" onClick={scrollToCourses}>
            시범 코스 체험하기
          </button>
        </div>
      </header>

      <main className="page page--home">
        <section className="panel">
          <h2 className="section-title">왜 만들었나요?</h2>
          <p className="mt-3 leading-relaxed text-[var(--ink)]">
            별도로 숲 프로그램에 갈 시간을 내기 어려운 사람도, 평소 이동 동선에서 가까운 녹지를
            이용할 수 있으면 좋겠어요. 역이나 정류장에서 학교·직장으로 가는 길에 있는 가로수길,
            소공원, 벤치를 연결해 일상 속 산림복지를 이어 줍니다.
          </p>
        </section>

        <section ref={coursesRef} id="courses" className="scroll-mt-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="eyebrow">체험용 예시 코스</p>
              <h2 className="section-title mt-1">{ROUTE_LABEL}</h2>
            </div>
            <p className="text-sm text-[var(--forest-soft)]">평소 경로 {BASE_MINUTES}분</p>
          </div>

          <div className="grid gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onSelect={openCourse} />
            ))}
          </div>
        </section>

        <section className="panel panel--muted">
          <p className="eyebrow">시범 운영 계획</p>
          <h2 className="section-title mt-2">통학로에서 4주간 시범 운영</h2>
          <p className="mt-3 leading-relaxed text-[var(--ink)]">
            사업안으로는 통학로 한 곳에서 4주간 시범 운영하고, 재이용률과 이용자 의견을 바탕으로
            코스를 개선합니다. 현재 운영 중인 서비스가 아니라, 공모전 제출용 시범 운영 계획입니다.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <p>그늘 출근길 · 산림복지 국민제안 공모전 제출용 데모</p>
      </footer>
    </div>
  )
}
