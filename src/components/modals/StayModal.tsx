'use client'

import { useEffect, useState } from 'react'
import { Stay, BookingStatus } from '../../types'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<Stay, 'id'>) => void
  initialData?: Stay
  defaultDate?: string
}

const BOOKING_OPTIONS: { value: BookingStatus; label: string }[] = [
  { value: 'booked', label: '予約済' },
  { value: 'not_booked', label: '未予約' },
  { value: 'not_required', label: '予約不要' },
]

export default function StayModal({ isOpen, onClose, onSave, initialData, defaultDate }: Props) {
  const [hotel, setHotel] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('not_booked')
  const [breakfast, setBreakfast] = useState(false)
  const [dinner, setDinner] = useState(false)
  const [bookingDate, setBookingDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [bookingSite, setBookingSite] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    if (isOpen) {
      setHotel(initialData?.hotel ?? '')
      setDate(initialData?.date ?? defaultDate ?? '')
      setLocation(initialData?.location ?? '')
      setPrice(initialData?.price?.toString() ?? '')
      setBookingStatus(initialData?.bookingStatus ?? 'not_booked')
      setBreakfast(initialData?.breakfast ?? false)
      setDinner(initialData?.dinner ?? false)
      setBookingDate(initialData?.bookingDate ?? '')
      setPaymentMethod(initialData?.paymentMethod ?? '')
      setBookingSite(initialData?.bookingSite ?? '')
      setNote(initialData?.note ?? '')
    }
  }, [isOpen, initialData, defaultDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!hotel.trim() || !date || !location.trim()) return
    onSave({
      hotel: hotel.trim(),
      date,
      location: location.trim(),
      price: Number(price) || 0,
      bookingStatus,
      breakfast,
      dinner,
      bookingDate: bookingDate || undefined,
      paymentMethod: paymentMethod.trim() || undefined,
      bookingSite: bookingSite.trim() || undefined,
      note: note.trim() || undefined,
    })
    onClose()
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? '宿泊を編集' : '宿泊を追加'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>ホテル名 *</label>
          <input
            type="text"
            value={hotel}
            onChange={e => setHotel(e.target.value)}
            placeholder="例: ホテルグランヴィア京都"
            className={inputClass}
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>チェックイン日 *</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>所在地 *</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="例: 京都市下京区"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>料金 (円)</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="0"
            min="0"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>予約状況 *</label>
          <div className="flex gap-4 flex-wrap mt-1">
            {BOOKING_OPTIONS.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="stayBookingStatus"
                  value={value}
                  checked={bookingStatus === value}
                  onChange={() => setBookingStatus(value)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>食事</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={breakfast}
                onChange={e => setBreakfast(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm text-gray-700">朝食付き</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dinner}
                onChange={e => setDinner(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm text-gray-700">夕食付き</span>
            </label>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            予約情報（任意）
          </p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>予約日</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>支払方法</label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  placeholder="例: クレジットカード"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>予約サイト</label>
              <input
                type="text"
                value={bookingSite}
                onChange={e => setBookingSite(e.target.value)}
                placeholder="例: じゃらん, 楽天トラベル"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>メモ</label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="メモを入力..."
            rows={2}
            className={inputClass}
          />
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            キャンセル
          </Button>
          <Button type="submit">保存</Button>
        </div>
      </form>
    </Modal>
  )
}
