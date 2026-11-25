export type StopTag = 'stairs' | 'bench'

export type CourseStop = {
  id: string
  name: string
  note?: string
  tags: StopTag[]
}

export type Course = {
  id: 'shade' | 'bench'
  name: string
  tagline: string
  totalMinutes: number
  walkMinutes: number
  restMinutes: number
  hasStairs: boolean
  benchCount: number
  summary: string
  activity: string
  accent: 'shade' | 'bench'
  icon: 'leaf' | 'bench'
  stops: CourseStop[]
}

export const BASE_MINUTES = 10
export const EXPERIENCE_SECONDS = 180

export const ROUTE_LABEL = '지하철역 → 대학 정문'

export const courses: Course[] = [
  {
    id: 'shade',
    name: '그늘길',
    tagline: '평소보다 3분 더 걷고 싶어요',
    totalMinutes: 13,
    walkMinutes: 13,
    restMinutes: 0,
    hasStairs: true,
    benchCount: 1,
    summary: '가로수 구간을 따라 걷는 코스',
    activity: '나뭇잎이 바람에 움직이는 모습을 잠시 바라보세요.',
    accent: 'shade',
    icon: 'leaf',
    stops: [
      { id: 's1', name: '역 출구', note: '출발', tags: [] },
      {
        id: 's2',
        name: '가로수길',
        note: '그늘이 이어지는 구간',
        tags: ['stairs', 'bench'],
      },
      { id: 's3', name: '대학 정문', note: '도착', tags: [] },
    ],
  },
  {
    id: 'bench',
    name: '벤치길',
    tagline: '가는 길에 3분 쉬고 싶어요',
    totalMinutes: 14,
    walkMinutes: 11,
    restMinutes: 3,
    hasStairs: false,
    benchCount: 2,
    summary: '소공원 벤치에 들르는 코스',
    activity: '나무 아래 벤치에 앉아 주변 풍경을 천천히 살펴보세요.',
    accent: 'bench',
    icon: 'bench',
    stops: [
      { id: 'b1', name: '역 출구', note: '출발', tags: [] },
      {
        id: 'b2',
        name: '소공원',
        note: '벤치에서 3분 휴식',
        tags: ['bench', 'bench'],
      },
      { id: 'b3', name: '대학 정문', note: '도착', tags: [] },
    ],
  },
]

export function getCourse(id: Course['id']): Course {
  const found = courses.find((c) => c.id === id)
  if (!found) throw new Error(`Unknown course: ${id}`)
  return found
}
