import type { Booking } from '../types'
import type { BookingService } from './bookingService'
import { SPACES } from '../data/spaces'
import { site } from '../config/site'
import { isFree, validSlot } from '../lib/availability'
import { calcPrice } from '../lib/pricing'
import { todayISO } from '../lib/dates'

const KEY = 'ma-bookings'
const wait = (ms: number) => new Promise(r => setTimeout(r, ms))
const mk = (spaceId: string, date: string, startHour: number, hours: number): Booking =>
  ({ id: `seed-${spaceId}-${date}-${startHour}`, spaceId, date, startHour, hours, name: 'Guest', email: '', total: 0, createdAt: '' })

function save(b: Booking[]) { try { localStorage.setItem(KEY, JSON.stringify(b)) } catch { /* ignore */ } }
function load(): Booking[] {
  try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw) } catch { /* ignore */ }
  const t = todayISO(), n = todayISO(1)
  const seed = [mk('pod-1', t, 9, 4), mk('pod-2', t, 10, 3), mk('box-1', t, 13, 2), mk('box-3', t, 14, 3), mk('pod-1', n, 9, 4)]
  save(seed); return seed
}

export const mockBookingService: BookingService = {
  async listBookings(date) { await wait(450); return load().filter(b => b.date === date) },
  async createBooking(input) {
    await wait(700)
    const space = SPACES.find(s => s.id === input.spaceId)
    if (!space) throw new Error('That space does not exist.')
    if (!validSlot(input, site.openHour, site.closeHour)) throw new Error('That time is outside opening hours.')
    const all = load()
    if (!isFree(all.filter(b => b.date === input.date), input.spaceId, input)) throw new Error('Sorry, that space was just booked. Please choose another.')
    const booking: Booking = { ...input, id: `MA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, total: calcPrice(space.pricePerHour, input.hours).total, createdAt: new Date().toISOString() }
    save([...all, booking]); return booking
  },
  async sendMessage() { await wait(700) },
}
