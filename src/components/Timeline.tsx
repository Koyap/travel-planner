'use client'

import { Trip, Transport, Stay, Activity } from '../types'
import { getDatesInRange } from '../utils/dateUtils'
import DayGroup from './DayGroup'

type Props = {
  trip: Trip
  onEditTransport: (transport: Transport) => void
  onDeleteTransport: (id: string) => void
  onEditStay: (stay: Stay) => void
  onDeleteStay: (id: string) => void
  onEditActivity: (activity: Activity) => void
  onDeleteActivity: (id: string) => void
  onAddTransport: (date: string) => void
  onAddStay: (date: string) => void
  onAddActivity: (date: string) => void
}

export default function Timeline({
  trip,
  onEditTransport,
  onDeleteTransport,
  onEditStay,
  onDeleteStay,
  onEditActivity,
  onDeleteActivity,
  onAddTransport,
  onAddStay,
  onAddActivity,
}: Props) {
  const dates = getDatesInRange(trip.startDate, trip.endDate)

  // Group items by date
  const transportsByDate = trip.transports.reduce<Record<string, Transport[]>>((acc, t) => {
    ;(acc[t.date] ??= []).push(t)
    return acc
  }, {})

  const staysByDate = trip.stays.reduce<Record<string, Stay[]>>((acc, s) => {
    ;(acc[s.date] ??= []).push(s)
    return acc
  }, {})

  const activitiesByDate = trip.activities.reduce<Record<string, Activity[]>>((acc, a) => {
    ;(acc[a.date] ??= []).push(a)
    return acc
  }, {})

  // Collect dates that have items but are outside the trip range
  const allItemDates = new Set([
    ...trip.transports.map(t => t.date),
    ...trip.stays.map(s => s.date),
    ...trip.activities.map(a => a.date),
  ])
  const extraDates = Array.from(allItemDates).filter(d => !dates.includes(d)).sort()

  const allDates = [...dates, ...extraDates]

  if (allDates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>旅行の日程が設定されていません</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {allDates.map(date => (
        <DayGroup
          key={date}
          date={date}
          startDate={trip.startDate}
          transports={transportsByDate[date] ?? []}
          stays={staysByDate[date] ?? []}
          activities={activitiesByDate[date] ?? []}
          onEditTransport={onEditTransport}
          onDeleteTransport={onDeleteTransport}
          onEditStay={onEditStay}
          onDeleteStay={onDeleteStay}
          onEditActivity={onEditActivity}
          onDeleteActivity={onDeleteActivity}
          onAddTransport={onAddTransport}
          onAddStay={onAddStay}
          onAddActivity={onAddActivity}
        />
      ))}
    </div>
  )
}
