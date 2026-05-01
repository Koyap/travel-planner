'use client'

import { Trip } from '../types'
import { formatShortDate, formatCurrency } from '../utils/dateUtils'
import Button from './ui/Button'

type Props = {
  trip: Trip
  onSelect: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function TripCard({ trip, onSelect, onEdit, onDelete }: Props) {
  const totalCost =
    trip.transports.reduce((sum, t) => sum + t.price, 0) +
    trip.stays.reduce((sum, s) => sum + s.price, 0) +
    trip.activities.reduce((sum, a) => sum + a.price, 0)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`「${trip.title}」を削除しますか？この操作は元に戻せません。`)) {
      onDelete()
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit()
  }

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all cursor-pointer group p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
            {trip.title}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {formatShortDate(trip.startDate)} 〜 {formatShortDate(trip.endDate)}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            編集
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="!text-red-400 hover:!text-red-600 hover:!bg-red-50"
          >
            削除
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
          <span>✈</span>
          <span>{trip.transports.length}件の移動</span>
        </div>
        <div className="flex items-center gap-1.5 bg-violet-50 text-violet-700 px-3 py-1 rounded-full">
          <span>🏨</span>
          <span>{trip.stays.length}泊</span>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
          <span>🎯</span>
          <span>{trip.activities.length}件のアクティビティ</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-xs text-gray-400">合計費用</span>
        <span className="text-xl font-bold text-gray-800">{formatCurrency(totalCost)}</span>
      </div>
    </div>
  )
}
