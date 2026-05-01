'use client'

import { useState } from 'react'
import { useTravelPlan } from '../hooks/useTravelPlan'
import { ModalState, Trip, Transport, Stay, Activity } from '../types'
import TripList from '../components/TripList'
import Timeline from '../components/Timeline'
import SummaryPanel from '../components/SummaryPanel'
import RecommendPanel from '../components/RecommendPanel'
import TripModal from '../components/modals/TripModal'
import TransportModal from '../components/modals/TransportModal'
import StayModal from '../components/modals/StayModal'
import ActivityModal from '../components/modals/ActivityModal'
import { formatShortDate } from '../utils/dateUtils'

export default function Page() {
  const {
    plan,
    loaded,
    addTrip,
    updateTrip,
    deleteTrip,
    addTransport,
    updateTransport,
    deleteTransport,
    addStay,
    updateStay,
    deleteStay,
    addActivity,
    updateActivity,
    deleteActivity,
  } = useTravelPlan()

  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const selectedTrip = plan.trips.find(t => t.id === selectedTripId) ?? null

  const closeModal = () => setModal({ type: 'none' })

  const handleSaveTrip = (data: Omit<Trip, 'id' | 'transports' | 'stays' | 'activities'>) => {
    if (modal.type === 'trip' && modal.data) {
      updateTrip(modal.data.id, data)
    } else {
      addTrip(data)
    }
  }

  const handleSaveTransport = (data: Omit<Transport, 'id'>) => {
    if (modal.type !== 'transport') return
    if (modal.data) {
      updateTransport(modal.tripId, modal.data.id, data)
    } else {
      addTransport(modal.tripId, data)
    }
  }

  const handleSaveStay = (data: Omit<Stay, 'id'>) => {
    if (modal.type !== 'stay') return
    if (modal.data) {
      updateStay(modal.tripId, modal.data.id, data)
    } else {
      addStay(modal.tripId, data)
    }
  }

  const handleSaveActivity = (data: Omit<Activity, 'id'>) => {
    if (modal.type !== 'activity') return
    if (modal.data) {
      updateActivity(modal.tripId, modal.data.id, data)
    } else {
      addActivity(modal.tripId, data)
    }
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-sm">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          {selectedTrip ? (
            <>
              <button
                onClick={() => setSelectedTripId(null)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
              >
                ← 戻る
              </button>
              <div className="min-w-0">
                <h1 className="font-bold text-base text-gray-800 truncate">{selectedTrip.title}</h1>
                <p className="text-xs text-gray-400">
                  {formatShortDate(selectedTrip.startDate)} 〜{' '}
                  {formatShortDate(selectedTrip.endDate)}
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setModal({ type: 'trip', data: selectedTrip })}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  編集
                </button>
              </div>
            </>
          ) : (
            <h1 className="font-bold text-xl text-gray-800 flex items-center gap-2">
              <span>✈️</span>
              <span>旅程管理</span>
            </h1>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {!selectedTrip ? (
          <TripList
            trips={plan.trips}
            onSelect={setSelectedTripId}
            onAdd={() => setModal({ type: 'trip' })}
            onEdit={trip => setModal({ type: 'trip', data: trip })}
            onDelete={deleteTrip}
          />
        ) : (
          <>
            <Timeline
              trip={selectedTrip}
              onEditTransport={t =>
                setModal({ type: 'transport', tripId: selectedTrip.id, data: t })
              }
              onDeleteTransport={id => deleteTransport(selectedTrip.id, id)}
              onEditStay={s => setModal({ type: 'stay', tripId: selectedTrip.id, data: s })}
              onDeleteStay={id => deleteStay(selectedTrip.id, id)}
              onEditActivity={a =>
                setModal({ type: 'activity', tripId: selectedTrip.id, data: a })
              }
              onDeleteActivity={id => deleteActivity(selectedTrip.id, id)}
              onAddTransport={date =>
                setModal({ type: 'transport', tripId: selectedTrip.id, defaultDate: date })
              }
              onAddStay={date =>
                setModal({ type: 'stay', tripId: selectedTrip.id, defaultDate: date })
              }
              onAddActivity={date =>
                setModal({ type: 'activity', tripId: selectedTrip.id, defaultDate: date })
              }
            />

            <SummaryPanel trip={selectedTrip} />

            <RecommendPanel />
          </>
        )}
      </main>

      {/* Modals */}
      <TripModal
        isOpen={modal.type === 'trip'}
        onClose={closeModal}
        onSave={handleSaveTrip}
        initialData={modal.type === 'trip' ? modal.data : undefined}
      />
      <TransportModal
        isOpen={modal.type === 'transport'}
        onClose={closeModal}
        onSave={handleSaveTransport}
        initialData={modal.type === 'transport' ? modal.data : undefined}
        defaultDate={modal.type === 'transport' ? modal.defaultDate : undefined}
      />
      <StayModal
        isOpen={modal.type === 'stay'}
        onClose={closeModal}
        onSave={handleSaveStay}
        initialData={modal.type === 'stay' ? modal.data : undefined}
        defaultDate={modal.type === 'stay' ? modal.defaultDate : undefined}
      />
      <ActivityModal
        isOpen={modal.type === 'activity'}
        onClose={closeModal}
        onSave={handleSaveActivity}
        initialData={modal.type === 'activity' ? modal.data : undefined}
        defaultDate={modal.type === 'activity' ? modal.defaultDate : undefined}
      />
    </div>
  )
}
