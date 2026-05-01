'use client'

import { Stay } from '../../types'
import { formatCurrency } from '../../utils/dateUtils'
import Badge from '../ui/Badge'
import BookingStatusBadge from '../ui/BookingStatusBadge'
import Button from '../ui/Button'

type Props = {
  stay: Stay
  onEdit: () => void
  onDelete: () => void
}

export default function StayCard({ stay, onEdit, onDelete }: Props) {
  const handleDelete = () => {
    if (confirm(`「${stay.hotel}」を削除しますか？`)) {
      onDelete()
    }
  }

  return (
    <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <Badge variant="stay">🏨 宿泊</Badge>
          <BookingStatusBadge status={stay.bookingStatus} />
          <span className="font-semibold text-gray-800 truncate">{stay.hotel}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="sm" onClick={onEdit}>
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

      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <span>📍</span>
          <span>{stay.location}</span>
        </div>
        {(stay.breakfast || stay.dinner) && (
          <div className="flex items-center gap-1.5">
            <span>🍽️</span>
            <div className="flex gap-1.5">
              {stay.breakfast && (
                <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  朝食付き
                </span>
              )}
              {stay.dinner && (
                <span className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  夕食付き
                </span>
              )}
            </div>
          </div>
        )}
        {stay.note && (
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>📝</span>
            <span>{stay.note}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div className="text-xs text-gray-400 space-x-2">
          {stay.bookingSite && <span>{stay.bookingSite}</span>}
          {stay.paymentMethod && <span>· {stay.paymentMethod}</span>}
          {stay.bookingDate && <span>· 予約: {stay.bookingDate}</span>}
        </div>
        <span className="font-bold text-violet-600">{formatCurrency(stay.price)}</span>
      </div>
    </div>
  )
}
