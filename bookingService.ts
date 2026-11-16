import type { Booking, BookingInput } from '../types'
// The "contract" the website depends on. A Supabase version only has to fulfil this.
export interface BookingService {
  listBookings(date: string): Promise<Booking[]>
  createBooking(input: BookingInput): Promise<Booking>
  sendMessage(m: { name: string; email: string; message: string }): Promise<void>
}
