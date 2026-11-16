import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SPACES } from '../data/spaces'
import { site } from '../config/site'
import { useBookings } from '../hooks/useBookings'
import { bookingService } from '../services'
import { isFree } from '../lib/availability'
import { calcPrice, money } from '../lib/pricing'
import { hourLabel, todayISO } from '../lib/dates'
import { Button, Heading, Notice } from '../components/ui'
import type { Booking, SpaceType } from '../types'

const field = 'w-full rounded-xl border border-walnut/20 bg-white/70 px-4 py-3 text-walnut focus:outline-none focus:ring-2 focus:ring-sage'

export default function BookingPage() {
  const [params] = useSearchParams()
  const today = todayISO()
  const [type, setType] = useState<SpaceType>(params.get('type') === 'sleep' ? 'sleep' : 'pod')
  const [date, setDate] = useState(today)
  const [startSel, setStartSel] = useState(10)
  const [hours, setHours] = useState(2)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [name, setName] = useState(''); const [email, setEmail] = useState('')
  const [phase, setPhase] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [error, setError] = useState('')
  const [done, setDone] = useState<Booking | null>(null)
  const { status, bookings, reload } = useBookings(date)

  const nowH = new Date().getHours()
  const starts = Array.from({ length: site.closeHour - site.openHour }, (_, i) => site.openHour + i).filter(h => date !== today || h > nowH)
  const start = starts.includes(startSel) ? startSel : starts[0]
  const fits = start !== undefined && start + hours <= site.closeHour
  const spaces = SPACES.filter(s => s.type === type)
  const free = (id: string) => fits && isFree(bookings, id, { startHour: start, hours })
  const selected = spaces.find(s => s.id === selectedId && free(s.id))
  const freeCount = spaces.filter(s => free(s.id)).length
  const price = selected ? calcPrice(selected.pricePerHour, hours) : null
  const canSubmit = !!selected && name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && phase !== 'submitting'

  async function confirm() {
    if (!selected) return
    setPhase('submitting'); setError('')
    try {
      setDone(await bookingService.createBooking({ spaceId: selected.id, date, startHour: start, hours, name: name.trim(), email: email.trim() }))
      setPhase('idle')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.'); setPhase('error'); reload()
    }
  }
  function reset() { setDone(null); setSelectedId(null); setName(''); setEmail(''); reload() }

  if (done) {
    const sp = SPACES.find(s => s.id === done.spaceId)
    return <div className="mx-auto max-w-xl px-5 py-20"><Notice kind="success" action={<Button onClick={reset}>Make another booking</Button>}>
      <h1 className="text-3xl">Booking confirmed</h1>
      <p className="mt-3 text-sm">Reference <b>{done.id}</b></p>
      <p className="mt-1 text-sm">{sp?.name} · {done.date} · {hourLabel(done.startHour)}–{hourLabel(done.startHour + done.hours)} ({done.hours}h)</p>
      <p className="mt-1 text-sm">Total {money(done.total)} · for {done.name}</p>
      <p className="mt-3 text-xs opacity-70">Prototype: saved in this browser only. No payment taken.</p></Notice></div>
  }

  return <div className="mx-auto max-w-6xl px-5 py-16">
    <Heading eyebrow="Booking" title="Reserve your space">Pick a date and time, then choose from what's free.</Heading>
    <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="space-y-4 rounded-3xl bg-ivory-deep p-6">
        <div className="flex gap-2">{(['pod', 'sleep'] as const).map(t => <button key={t} onClick={() => setType(t)} className={`flex-1 rounded-full px-3 py-2 text-sm ${type === t ? 'bg-walnut text-ivory' : 'border border-walnut/30'}`}>{t === 'pod' ? 'Study Pods' : 'Sleep Boxes'}</button>)}</div>
        <label className="block text-sm">Date<input type="date" className={field} min={today} value={date} onChange={e => e.target.value && setDate(e.target.value)} /></label>
        <label className="block text-sm">Start time<select className={field} value={start ?? ''} onChange={e => setStartSel(Number(e.target.value))} disabled={starts.length === 0}>{starts.map(h => <option key={h} value={h}>{hourLabel(h)}</option>)}</select></label>
        <label className="block text-sm">Duration<select className={field} value={hours} onChange={e => setHours(Number(e.target.value))}>{[1, 2, 3, 4, 5, 6, 8].map(h => <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}{h >= 4 ? ' (10% off)' : ''}</option>)}</select></label>
        <p className="text-xs text-walnut/70">Open {site.hoursText}. {site.currencyNote}.</p>
      </div>
      <div>
        {status === 'loading' && <Notice kind="loading">Checking availability…</Notice>}
        {status === 'error' && <Notice kind="error" action={<Button variant="ghost" onClick={reload}>Try again</Button>}>We couldn't load availability.</Notice>}
        {status === 'ready' && starts.length === 0 && <Notice kind="empty">We're closed for today. Please pick another date.</Notice>}
        {status === 'ready' && starts.length > 0 && !fits && <Notice kind="empty">That stay would run past closing ({hourLabel(site.closeHour)}). Try an earlier start or shorter duration.</Notice>}
        {status === 'ready' && fits && <>
          <p className="mb-4 text-sm">{freeCount} of {spaces.length} available · {hourLabel(start)}–{hourLabel(start + hours)}</p>
          {freeCount === 0 && <Notice kind="empty">Everything is taken at this time. Try another time or space type.</Notice>}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{spaces.map(s => {
            const ok = free(s.id), on = selected?.id === s.id
            return <button key={s.id} disabled={!ok} onClick={() => setSelectedId(s.id)} aria-pressed={on}
              className={`rounded-2xl border p-4 text-left transition ${on ? 'border-walnut bg-walnut text-ivory' : ok ? 'border-sage bg-sage/15 hover:bg-sage/30' : 'cursor-not-allowed border-walnut/10 bg-walnut/5 opacity-50'}`}>
              <span className="block font-serif text-xl">{s.name}</span><span className="text-xs">{ok ? `${money(s.pricePerHour)}/h` : 'Taken'}</span></button>
          })}</div>
          {selected && price && <div className="mt-8 space-y-4 rounded-3xl bg-ivory-deep p-6">
            <div className="text-sm"><p>{selected.name} × {hours}h = {money(price.subtotal)}</p>{price.discount > 0 && <p>Long-stay discount −{money(price.discount)}</p>}<p className="mt-1 font-serif text-3xl">Total {money(price.total)}</p></div>
            <div className="grid gap-3 sm:grid-cols-2"><input className={field} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} /><input className={field} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /></div>
            {phase === 'error' && <Notice kind="error">{error}</Notice>}
            <Button onClick={confirm} disabled={!canSubmit}>{phase === 'submitting' ? 'Confirming…' : 'Confirm booking'}</Button>
          </div>}
          {!selected && freeCount > 0 && <p className="mt-6 text-sm text-walnut/70">Choose a space above to see your price.</p>}
        </>}
      </div>
    </div></div>
}
