import type { Course } from '../data/courses'

export type Feeling = 'good' | 'okay' | 'disappointed'
export type Reuse = 'yes' | 'maybe' | 'no'

export type FeedbackEntry = {
  id: string
  courseId: Course['id']
  courseName: string
  feeling: Feeling
  reuse: Reuse
  comment: string
  createdAt: string
}

const STORAGE_KEY = 'geuneul-chulgeungil-feedbacks'

export function loadFeedbacks(): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as FeedbackEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveFeedback(entry: Omit<FeedbackEntry, 'id' | 'createdAt'>): FeedbackEntry {
  const next: FeedbackEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  }
  const list = loadFeedbacks()
  list.unshift(next)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return next
}
