'use client'

import { Transport, Stay, Activity } from '../types'
import { formatShortDate, getDayNumber } from '../utils/dateUtils'
import TransportCard from './cards/TransportCard'
import StayCard from './cards/StayCard'
import ActivityCard from './cards/ActivityCard'

type Props = {
  date: string
  startDate: string
  transports: Transport[]
  stays: Stay[]
  activities: Activity[]
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

export default function DayGroup({
  date,
  startDate,
  transports,
  stays,
  activities,
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
  const dayNumber = getDayNumber(startDate, date)
  const sortedTransports = [...transports].sort((a, b) => a.time.localeCompare(b.time))
  const hasItems = transports.length > 0 || stays.length > 0 || activities.length > 0

  return (
    <div className="relative">
      {/* Day header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-14 h-7 bg-blue-600 text-white text-xs font-bold rounded-full shrink-0">
          DAY {dayNumber}
        </div>
        <span className="font-semibold text-gray-700">{formatShortDate(date)}</span>
        <div className="flex-1 border-b border-gray-200" />
      </div>

      {/* Items */}
      <div className="ml-4 pl-4 border-l-2 border-gray-100">
        {!hasItems && (
          <p className="text-sm text-gray-400 italic py-2">この日の予定はまだありません</p>
        )}

        <div className="space-y-3">
          {/* Transports sorted by time */}
          {sortedTransports.map(transport => (
            <TransportCard
              key={transport.id}
              transport={transport}
              onEdit={() => onEditTransport(transport)}
              onDelete={() => onDeleteTransport(transport.id)}
            />
          ))}

          {/* Activities */}
          {activities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onEdit={() => onEditActivity(activity)}
              onDelete={() => onDeleteActivity(activity.id)}
            />
          ))}

          {/* Stays (shown at end of day) */}
          {stays.map(stay => (
            <StayCard
              key={stay.id}
              stay={stay}
              onEdit={() => onEditStay(stay)}
              onDelete={() => onDeleteStay(stay.id)}
            />
          ))}
        </div>

        {/* Add buttons */}
        <div className="flex flex-wrap gap-2 mt-3 pt-2">
          <button
            onClick={() => onAddTransport(date)}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
          >
            + 移動
          </button>
          <button
            onClick={() => onAddActivity(date)}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
          >
            + アクティビティ
          </button>
          <button
            onClick={() => onAddStay(date)}
            className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
          >
            + 宿泊
          </button>
        </div>
      </div>
    </div>
  )
}
