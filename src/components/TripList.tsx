'use client'

import { Trip } from '../types'
import TripCard from './TripCard'
import Button from './ui/Button'

type Props = {
  trips: Trip[]
  onSelect: (id: string) => void
  onAdd: () => void
  onEdit: (trip: Trip) => void
  onDelete: (id: string) => void
}

export default function TripList({ trips, onSelect, onAdd, onEdit, onDelete }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">旅行一覧</h2>
          <p className="text-sm text-gray-500 mt-1">
            {trips.length > 0
              ? `${trips.length}件の旅行が登録されています`
              : '旅行を追加してはじめましょう'}
          </p>
        </div>
        <Button onClick={onAdd} size="md">
          + 旅行を追加
        </Button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">旅行がまだありません</h3>
          <p className="text-sm text-gray-500 mb-6">
            「旅行を追加」ボタンから最初の旅行を登録しましょう
          </p>
          <Button onClick={onAdd}>旅行を追加する</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map(trip => (
            <TripCard
              key={trip.id}
              trip={trip}
              onSelect={() => onSelect(trip.id)}
              onEdit={() => onEdit(trip)}
              onDelete={() => onDelete(trip.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
