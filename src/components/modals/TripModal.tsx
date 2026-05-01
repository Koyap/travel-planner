'use client'

import { useEffect, useState } from 'react'
import { Trip } from '../../types'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<Trip, 'id' | 'transports' | 'stays' | 'activities'>) => void
  initialData?: Trip
}

export default function TripModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title ?? '')
      setStartDate(initialData?.startDate ?? '')
      setEndDate(initialData?.endDate ?? '')
    }
  }, [isOpen, initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !startDate || !endDate) return
    onSave({ title: title.trim(), startDate, endDate })
    onClose()
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? '旅行を編集' : '旅行を追加'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>旅行名 *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="例: 京都・大阪旅行 2024"
            className={inputClass}
            required
            autoFocus
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>出発日 *</label>
            <input
              type="date"
              value={startDate}
              onChange={e => {
                setStartDate(e.target.value)
                if (endDate && e.target.value > endDate) setEndDate(e.target.value)
              }}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>帰宅日 *</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={startDate}
              className={inputClass}
              required
            />
          </div>
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
