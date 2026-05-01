import { TravelPlan } from '../types'

const STORAGE_KEY = 'travel-planner-v1'

export function loadTravelPlan(): TravelPlan {
  if (typeof window === 'undefined') return { trips: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { trips: [] }
    return JSON.parse(raw) as TravelPlan
  } catch {
    return { trips: [] }
  }
}

export function saveTravelPlan(plan: TravelPlan): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
}
