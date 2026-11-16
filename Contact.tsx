import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Clock, Mail, MapPin } from 'lucide-react'
import { Button, Heading, Notice } from '../components/ui'
import { bookingService } from '../services'
import { site } from '../config/site'
export const field = 'w-full rounded-xl border border-walnut/20 bg-white/70 px-4 py-3 text-walnut focus:outline-none focus:ring-2 focus:ring-sage'
export default function Contact() {
  const plan = useSearchParams()[0].get('plan')
  const [name, setName] = useState(''); const [email, setEmail] = useState('')
  const [message, setMessage] = useState(plan ? `Hi! I'd like to join the ${plan} membership.` : '')
  const [phase, setPhase] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  async function submit(e: FormEvent) {
    e.preventDefault(); setPhase('sending')
    try { await bookingService.sendMessage({ name, email, message }); setPhase('sent') } catch { setPhase('error') }
  }
  return <div className="mx-auto max-w-5xl px-5 py-16">
    <Heading eyebrow="Contact" title="We'd love to hear from you" />
    <div className="mt-12 grid gap-10 md:grid-cols-2">
      <ul className="space-y-4"><li className="flex gap-3"><MapPin />{site.address}</li><li className="flex gap-3"><Clock />{site.hoursText}</li><li className="flex gap-3"><Mail />{site.email}</li></ul>
      {phase === 'sent' ? <Notice kind="success" action={<Button variant="ghost" onClick={() => { setPhase('idle'); setMessage('') }}>Send another</Button>}>Thank you — we'll reply soon.</Notice> :
      <form onSubmit={submit} className="space-y-4">
        <input className={field} required placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
        <input className={field} required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <textarea className={field} required rows={5} placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
        {phase === 'error' && <Notice kind="error">Couldn't send. Please try again.</Notice>}
        <Button type="submit" disabled={phase === 'sending'}>{phase === 'sending' ? 'Sending…' : 'Send message'}</Button>
      </form>}
    </div></div>
}
