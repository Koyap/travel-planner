'use client'

import { useState, useEffect, useCallback } from 'react'
import { TravelPlan, Trip, Transport, Stay, Activity } from '../types'
import { loadPlanFromFirestore, savePlanToFirestore } from '../utils/firestoreStorage'
import { loadTravelPlan } from '../utils/storage'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useTravelPlan(planId: string | null) {
  const [plan, setPlan] = useState<TravelPlan>({ trips: [] })
  const [loaded, setLoaded] = useState(false)

  // planIdが確定したらFirestoreからロード（localStorageからの移行も処理）
  useEffect(() => {
    if (!planId) return

    async function load() {
      const firestorePlan = await loadPlanFromFirestore(planId!)
      if (firestorePlan) {
        setPlan(firestorePlan)
      } else {
        // FirestoreにデータがなければlocalStorageを確認して移行
        const localPlan = loadTravelPlan()
        if (localPlan.trips.length > 0) {
          setPlan(localPlan)
          await savePlanToFirestore(planId!, localPlan)
        }
      }
      setLoaded(true)
    }

    load()
  }, [planId])

  const updatePlan = useCallback(
    (updater: (prev: TravelPlan) => TravelPlan) => {
      if (!planId) return
      setPlan(prev => {
        const next = updater(prev)
        savePlanToFirestore(planId, next)
        return next
      })
    },
    [planId]
  )

  const addTrip = useCallback(
    (data: Omit<Trip, 'id' | 'transports' | 'stays' | 'activities'>) => {
      updatePlan(prev => ({
        ...prev,
        trips: [
          ...prev.trips,
          { ...data, id: generateId(), transports: [], stays: [], activities: [] },
        ],
      }))
    },
    [updatePlan]
  )

  const updateTrip = useCallback(
    (id: string, updates: Partial<Omit<Trip, 'id' | 'transports' | 'stays' | 'activities'>>) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t => (t.id === id ? { ...t, ...updates } : t)),
      }))
    },
    [updatePlan]
  )

  const deleteTrip = useCallback(
    (id: string) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.filter(t => t.id !== id),
      }))
    },
    [updatePlan]
  )

  const addTransport = useCallback(
    (tripId: string, data: Omit<Transport, 'id'>) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? { ...t, transports: [...t.transports, { ...data, id: generateId() }] }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  const updateTransport = useCallback(
    (tripId: string, id: string, updates: Partial<Omit<Transport, 'id'>>) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? {
                ...t,
                transports: t.transports.map(tr =>
                  tr.id === id ? { ...tr, ...updates } : tr
                ),
              }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  const deleteTransport = useCallback(
    (tripId: string, id: string) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? { ...t, transports: t.transports.filter(tr => tr.id !== id) }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  const addStay = useCallback(
    (tripId: string, data: Omit<Stay, 'id'>) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? { ...t, stays: [...t.stays, { ...data, id: generateId() }] }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  const updateStay = useCallback(
    (tripId: string, id: string, updates: Partial<Omit<Stay, 'id'>>) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? { ...t, stays: t.stays.map(s => (s.id === id ? { ...s, ...updates } : s)) }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  const deleteStay = useCallback(
    (tripId: string, id: string) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? { ...t, stays: t.stays.filter(s => s.id !== id) }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  const addActivity = useCallback(
    (tripId: string, data: Omit<Activity, 'id'>) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? { ...t, activities: [...t.activities, { ...data, id: generateId() }] }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  const updateActivity = useCallback(
    (tripId: string, id: string, updates: Partial<Omit<Activity, 'id'>>) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? {
                ...t,
                activities: t.activities.map(a =>
                  a.id === id ? { ...a, ...updates } : a
                ),
              }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  const deleteActivity = useCallback(
    (tripId: string, id: string) => {
      updatePlan(prev => ({
        ...prev,
        trips: prev.trips.map(t =>
          t.id === tripId
            ? { ...t, activities: t.activities.filter(a => a.id !== id) }
            : t
        ),
      }))
    },
    [updatePlan]
  )

  return {
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
  }
}
