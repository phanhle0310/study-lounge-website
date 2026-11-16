import type { BookingService } from './bookingService'
import { mockBookingService } from './mockBookingService'
// SUPABASE LATER: create supabaseBookingService.ts implementing BookingService,
// then change the line below. No page or component needs to change.
export const bookingService: BookingService = mockBookingService
