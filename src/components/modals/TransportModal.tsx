'use client'

import { useEffect, useState } from 'react'
import { Transport, BookingStatus } from '../../types'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<Transport, 'id'>) => void
  initialData?: Transport
  defaultDate?: string
}

const BOOKING_OPTIONS: { value: BookingStatus; label: string }[] = [
  { value: 'booked', label: '予約済' },
  { value: 'not_booked', label: '未予約' },
  { value: 'not_required', label: '予約不要' },
]

export default function TransportModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  defaultDate,
}: Props) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [price, setPrice] = useState('')
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('not_booked')
  const [plan, setPlan] = useState('')
  const [terminal, setTerminal] = useState('')
  const [baggage, setBaggage] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [bookingSite, setBookingSite] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    if (isOpen) {
      setFrom(initialData?.from ?? '')
      setTo(initialData?.to ?? '')
      setDate(initialData?.date ?? defaultDate ?? '')
      setTime(initialData?.time ?? '')
      setPrice(initialData?.price?.toString() ?? '')
      setBookingStatus(initialData?.bookingStatus ?? 'not_booked')
      setPlan(initialData?.plan ?? '')
      setTerminal(initialData?.terminal ?? '')
      setBaggage(initialData?.baggage ?? '')
      setBookingDate(initialData?.bookingDate ?? '')
      setPaymentMethod(initialData?.paymentMethod ?? '')
      setBookingSite(initialData?.bookingSite ?? '')
      setNote(initialData?.note ?? '')
    }
  }, [isOpen, initialData, defaultDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!from.trim() || !to.trim() || !date || !time) return
    onSave({
      from: from.trim(),
      to: to.trim(),
      date,
      time,
      price: Number(price) || 0,
      bookingStatus,
      plan: plan.trim() || undefined,
      terminal: terminal.trim() || undefined,
      baggage: baggage.trim() || undefined,
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? '移動を編集' : '移動を追加'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>出発地 *</label>
            <input
              type="text"
              value={from}
              onChange={e => setFrom(e.target.value)}
              placeholder="例: 東京"
              className={inputClass}
              required
              autoFocus
            />
          </div>
          <div>
            <label className={labelClass}>到着地 *</label>
            <input
              type="text"
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="例: 大阪"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>日付 *</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>出発時刻 *</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
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
                  name="transportBookingStatus"
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
          <label className={labelClass}>便名・プラン</label>
          <input
            type="text"
            value={plan}
            onChange={e => setPlan(e.target.value)}
            placeholder="例: NH503便, のぞみ15号"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>ターミナル</label>
            <input
              type="text"
              value={terminal}
              onChange={e => setTerminal(e.target.value)}
              placeholder="例: 第1ターミナル"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>手荷物</label>
            <input
              type="text"
              value={baggage}
              onChange={e => setBaggage(e.target.value)}
              placeholder="例: 受託荷物あり"
              className={inputClass}
            />
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
                placeholder="例: ANA公式サイト"
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
