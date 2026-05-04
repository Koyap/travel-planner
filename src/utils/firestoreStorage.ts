import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { TravelPlan } from '../types'

export async function loadPlanFromFirestore(planId: string): Promise<TravelPlan | null> {
  try {
    const snap = await getDoc(doc(db, 'plans', planId))
    if (snap.exists()) {
      return snap.data().travelPlan as TravelPlan
    }
    return null
  } catch (err) {
    console.error('Firestore load error:', err)
    return null
  }
}

export async function savePlanToFirestore(planId: string, plan: TravelPlan): Promise<void> {
  try {
    await setDoc(doc(db, 'plans', planId), {
      travelPlan: plan,
      updatedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Firestore save error:', err)
  }
}
