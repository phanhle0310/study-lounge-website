import { useCallback, useEffect, useState } from 'react'
import type { Booking } from '../types'
import { bookingService } from '../services'
export function useBookings(date: string) {
  const [state, setState] = useState<{ status: 'loading' | 'ready' | 'error'; bookings: Booking[] }>({ status: 'loading', bookings: [] })
  const load = useCallback(() => {
    setState({ status: 'loading', bookings: [] })
    bookingService.listBookings(date).then(bookings => setState({ status: 'ready', bookings })).catch(() => setState({ status: 'error', bookings: [] }))
  }, [date])
  useEffect(() => { load() }, [load])
  return { ...state, reload: load }
}
