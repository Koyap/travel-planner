'use client'

import { Activity } from '../../types'
import { formatCurrency } from '../../utils/dateUtils'
import Badge from '../ui/Badge'
import BookingStatusBadge from '../ui/BookingStatusBadge'
import Button from '../ui/Button'

type Props = {
  activity: Activity
  onEdit: () => void
  onDelete: () => void
}

export default function ActivityCard({ activity, onEdit, onDelete }: Props) {
  const handleDelete = () => {
    if (confirm(`「${activity.name}」を削除しますか？`)) {
      onDelete()
    }
  }

  return (
    <div className="bg-white border border-amber-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <Badge variant="activity">🎯 アクティビティ</Badge>
          <BookingStatusBadge status={activity.bookingStatus} />
          <span className="font-semibold text-gray-800 truncate">{activity.name}</span>
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
          <span>{activity.location}</span>
        </div>
        {activity.plan && (
          <div className="flex items-center gap-1.5">
            <span>📋</span>
            <span>{activity.plan}</span>
          </div>
        )}
        {activity.note && (
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>📝</span>
            <span>{activity.note}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div className="text-xs text-gray-400 space-x-2">
          {activity.bookingSite && <span>{activity.bookingSite}</span>}
          {activity.paymentMethod && <span>· {activity.paymentMethod}</span>}
          {activity.bookingDate && <span>· 予約: {activity.bookingDate}</span>}
        </div>
        <span className="font-bold text-amber-600">{formatCurrency(activity.price)}</span>
      </div>
    </div>
  )
}
