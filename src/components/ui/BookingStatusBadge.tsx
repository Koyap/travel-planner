import { BookingStatus } from '../../types'

const config: Record<BookingStatus, { label: string; className: string }> = {
  booked: { label: '予約済', className: 'bg-green-100 text-green-700' },
  not_booked: { label: '未予約', className: 'bg-red-100 text-red-600' },
  not_required: { label: '予約不要', className: 'bg-gray-100 text-gray-500' },
}

type Props = {
  status: BookingStatus | undefined
  size?: 'sm' | 'xs'
}

export default function BookingStatusBadge({ status, size = 'sm' }: Props) {
  if (!status) return null
  const { label, className } = config[status]
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${className} ${
        size === 'xs' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-xs'
      }`}
    >
      {label}
    </span>
  )
}
