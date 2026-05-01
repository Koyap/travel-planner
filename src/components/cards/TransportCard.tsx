'use client'

import { Transport } from '../../types'
import { formatCurrency } from '../../utils/dateUtils'
import Badge from '../ui/Badge'
import BookingStatusBadge from '../ui/BookingStatusBadge'
import Button from '../ui/Button'

type Props = {
  transport: Transport
  onEdit: () => void
  onDelete: () => void
}

export default function TransportCard({ transport, onEdit, onDelete }: Props) {
  const handleDelete = () => {
    if (confirm(`「${transport.from} → ${transport.to}」を削除しますか？`)) {
      onDelete()
    }
  }

  return (
    <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <Badge variant="transport">✈ 移動</Badge>
          <BookingStatusBadge status={transport.bookingStatus} />
          <span className="font-semibold text-gray-800 truncate">
            {transport.from} → {transport.to}
          </span>
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
        {transport.time && (
          <div className="flex items-center gap-1.5">
            <span>🕐</span>
            <span>{transport.time} 出発</span>
          </div>
        )}
        {transport.plan && (
          <div className="flex items-center gap-1.5">
            <span>🎫</span>
            <span>{transport.plan}</span>
          </div>
        )}
        {transport.terminal && (
          <div className="flex items-center gap-1.5">
            <span>🏢</span>
            <span>ターミナル: {transport.terminal}</span>
          </div>
        )}
        {transport.baggage && (
          <div className="flex items-center gap-1.5">
            <span>🧳</span>
            <span>{transport.baggage}</span>
          </div>
        )}
        {transport.note && (
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>📝</span>
            <span>{transport.note}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div className="text-xs text-gray-400 space-x-2">
          {transport.bookingSite && <span>{transport.bookingSite}</span>}
          {transport.paymentMethod && <span>· {transport.paymentMethod}</span>}
          {transport.bookingDate && <span>· 予約: {transport.bookingDate}</span>}
        </div>
        <span className="font-bold text-blue-600">{formatCurrency(transport.price)}</span>
      </div>
    </div>
  )
}
