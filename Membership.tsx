import { Check } from 'lucide-react'
import { Heading, LinkButton } from '../components/ui'
import { PLANS } from '../data/content'
export default function Membership() {
  return <div className="mx-auto max-w-6xl px-5 py-16">
    <Heading eyebrow="Membership" title="Make a habit of calm">Monthly plans for regulars. Cancel any time.</Heading>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {PLANS.map(p => <article key={p.name} className={`flex flex-col rounded-3xl p-8 ${p.name === 'Ma Full' ? 'bg-walnut-dark text-ivory' : 'bg-ivory-deep'}`}>
        <h2 className={`text-3xl ${p.name === 'Ma Full' ? '!text-ivory' : ''}`}>{p.name}</h2><p className="text-sm opacity-80">{p.note}</p>
        <p className="mt-4 font-serif text-5xl">${p.price}<span className="text-base"> / month</span></p>
        <ul className="my-6 flex-1 space-y-2 text-sm">{p.perks.map(k => <li key={k} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0" />{k}</li>)}</ul>
        <LinkButton to={`/contact?plan=${encodeURIComponent(p.name)}`} variant={p.name === 'Ma Full' ? 'ghost' : 'solid'}>Join {p.name}</LinkButton>
      </article>)}
    </div></div>
}
