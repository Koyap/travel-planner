'use client'

import { useState } from 'react'
import { Trip, Transport, Stay, Activity } from '../types'
import { formatCurrency, formatShortDate } from '../utils/dateUtils'
import BookingStatusBadge from './ui/BookingStatusBadge'

type ActiveCategory = 'transport' | 'stay' | 'activity' | null

// --- ドリルダウン行 ---

function TransportRow({ item }: { item: Transport }) {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-sm">
      <BookingStatusBadge status={item.bookingStatus} size="xs" />
      <span className="flex-1 text-gray-700 truncate">
        {item.from} → {item.to}
        {item.plan && <span className="text-gray-400 ml-1">({item.plan})</span>}
      </span>
      <span className="text-gray-400 shrink-0">{formatShortDate(item.date)}</span>
      <span className="font-semibold text-blue-600 shrink-0 w-20 text-right">
        {formatCurrency(item.price)}
      </span>
    </div>
  )
}

function StayRow({ item }: { item: Stay }) {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-sm">
      <BookingStatusBadge status={item.bookingStatus} size="xs" />
      <span className="flex-1 text-gray-700 truncate">{item.hotel}</span>
      <span className="text-gray-400 shrink-0">{formatShortDate(item.date)}</span>
      <span className="font-semibold text-violet-600 shrink-0 w-20 text-right">
        {formatCurrency(item.price)}
      </span>
    </div>
  )
}

function ActivityRow({ item }: { item: Activity }) {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-sm">
      <BookingStatusBadge status={item.bookingStatus} size="xs" />
      <span className="flex-1 text-gray-700 truncate">{item.name}</span>
      <span className="text-gray-400 shrink-0">{formatShortDate(item.date)}</span>
      <span className="font-semibold text-amber-600 shrink-0 w-20 text-right">
        {formatCurrency(item.price)}
      </span>
    </div>
  )
}

// --- メインコンポーネント ---

type Props = { trip: Trip }

export default function SummaryPanel({ trip }: Props) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null)

  const transportTotal = trip.transports.reduce((sum, t) => sum + t.price, 0)
  const stayTotal = trip.stays.reduce((sum, s) => sum + s.price, 0)
  const activityTotal = trip.activities.reduce((sum, a) => sum + a.price, 0)
  const total = transportTotal + stayTotal + activityTotal

  const toggle = (cat: ActiveCategory) =>
    setActiveCategory(prev => (prev === cat ? null : cat))

  const sortedTransports = [...trip.transports].sort(
    (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
  )
  const sortedStays = [...trip.stays].sort((a, b) => a.date.localeCompare(b.date))
  const sortedActivities = [...trip.activities].sort((a, b) => a.date.localeCompare(b.date))

  const categoryBtnBase =
    'flex flex-col items-center rounded-xl py-3 px-2 transition-all cursor-pointer border-2 w-full text-left'

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        費用サマリー
        <span className="ml-2 text-xs font-normal text-gray-400 normal-case">
          （カテゴリをクリックで一覧表示）
        </span>
      </h3>

      {/* カテゴリボタン */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        <button
          onClick={() => toggle('transport')}
          className={`${categoryBtnBase} ${
            activeCategory === 'transport'
              ? 'bg-blue-50 border-blue-400'
              : 'bg-blue-50 border-transparent hover:border-blue-200'
          }`}
        >
          <div className="text-lg sm:text-xl font-bold text-blue-600">
            {formatCurrency(transportTotal)}
          </div>
          <div className="text-xs text-blue-500 mt-0.5">✈ 移動</div>
          <div className="text-xs text-blue-400 mt-0.5">{trip.transports.length}件</div>
        </button>

        <button
          onClick={() => toggle('stay')}
          className={`${categoryBtnBase} ${
            activeCategory === 'stay'
              ? 'bg-violet-50 border-violet-400'
              : 'bg-violet-50 border-transparent hover:border-violet-200'
          }`}
        >
          <div className="text-lg sm:text-xl font-bold text-violet-600">
            {formatCurrency(stayTotal)}
          </div>
          <div className="text-xs text-violet-500 mt-0.5">🏨 宿泊</div>
          <div className="text-xs text-violet-400 mt-0.5">{trip.stays.length}件</div>
        </button>

        <button
          onClick={() => toggle('activity')}
          className={`${categoryBtnBase} ${
            activeCategory === 'activity'
              ? 'bg-amber-50 border-amber-400'
              : 'bg-amber-50 border-transparent hover:border-amber-200'
          }`}
        >
          <div className="text-lg sm:text-xl font-bold text-amber-600">
            {formatCurrency(activityTotal)}
          </div>
          <div className="text-xs text-amber-500 mt-0.5">🎯 アクティビティ</div>
          <div className="text-xs text-amber-400 mt-0.5">{trip.activities.length}件</div>
        </button>
      </div>

      {/* ドリルダウンリスト */}
      {activeCategory && (
        <div className="bg-gray-50 rounded-xl px-4 py-2 mb-4">
          {activeCategory === 'transport' && (
            <>
              {sortedTransports.length === 0 ? (
                <p className="text-sm text-gray-400 py-2 text-center">移動の登録がありません</p>
              ) : (
                sortedTransports.map(t => <TransportRow key={t.id} item={t} />)
              )}
            </>
          )}
          {activeCategory === 'stay' && (
            <>
              {sortedStays.length === 0 ? (
                <p className="text-sm text-gray-400 py-2 text-center">宿泊の登録がありません</p>
              ) : (
                sortedStays.map(s => <StayRow key={s.id} item={s} />)
              )}
            </>
          )}
          {activeCategory === 'activity' && (
            <>
              {sortedActivities.length === 0 ? (
                <p className="text-sm text-gray-400 py-2 text-center">
                  アクティビティの登録がありません
                </p>
              ) : (
                sortedActivities.map(a => <ActivityRow key={a.id} item={a} />)
              )}
            </>
          )}
        </div>
      )}

      {/* 合計 */}
      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">旅行合計</span>
        <span className="text-2xl font-bold text-gray-800">{formatCurrency(total)}</span>
      </div>
    </div>
  )
}
