import type { Booking } from '../types'
type Slot = { startHour: number; hours: number }
export const overlaps = (a: Slot, b: Slot) => a.startHour < b.startHour + b.hours && b.startHour < a.startHour + a.hours
export const isFree = (bookings: Booking[], spaceId: string, slot: Slot) => !bookings.some(b => b.spaceId === spaceId && overlaps(b, slot))
export const validSlot = (s: Slot, open: number, close: number) => s.startHour >= open && s.hours >= 1 && s.startHour + s.hours <= close
