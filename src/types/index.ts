export type TravelPlan = {
  trips: Trip[]
}

export type Trip = {
  id: string
  title: string
  startDate: string
  endDate: string
  transports: Transport[]
  stays: Stay[]
  activities: Activity[]
}

export type BookingStatus = 'booked' | 'not_booked' | 'not_required'

export type Transport = {
  id: string
  from: string
  to: string
  date: string
  time: string
  price: number
  bookingStatus?: BookingStatus
  bookingDate?: string
  paymentMethod?: string
  bookingSite?: string
  plan?: string
  note?: string
  baggage?: string
  terminal?: string
}

export type Stay = {
  id: string
  hotel: string
  date: string
  location: string
  price: number
  bookingStatus?: BookingStatus
  bookingDate?: string
  paymentMethod?: string
  bookingSite?: string
  breakfast?: boolean
  dinner?: boolean
  note?: string
}

export type Activity = {
  id: string
  name: string
  date: string
  location: string
  price: number
  bookingStatus?: BookingStatus
  bookingDate?: string
  paymentMethod?: string
  bookingSite?: string
  plan?: string
  note?: string
}

export type ModalState =
  | { type: 'none' }
  | { type: 'trip'; data?: Trip }
  | { type: 'transport'; tripId: string; data?: Transport; defaultDate?: string }
  | { type: 'stay'; tripId: string; data?: Stay; defaultDate?: string }
  | { type: 'activity'; tripId: string; data?: Activity; defaultDate?: string }
