import { Heading, LinkButton, Photo } from '../components/ui'
import { SPACES } from '../data/spaces'
import { money } from '../lib/pricing'

const rows = [
  { title: 'Study Café', tone: 'ivory' as const, text: 'Open tables, long benches and the gentle sound of a pour-over being made. Order from the menu and stay as long as you like.', facts: ['Free Wi-Fi & power', 'Shared tables', 'Walk-ins welcome'], to: '/menu', cta: 'See the menu', price: 'No booking needed' },
  { title: 'Quiet Study Pods', tone: 'sage' as const, text: 'Four enclosed pods with sound-dampening panels, warm task lighting and a desk sized for deep work.', facts: ['4 private pods', 'Sound-dampened', 'Desk, lamp, outlets'], to: '/booking?type=pod', cta: 'Book a pod', type: 'pod' },
  { title: 'Sleep Boxes', tone: 'walnut' as const, text: 'Eight cocoon-style boxes with a firm mattress, blackout panel and gentle wake-up light for a proper reset.', facts: ['8 sleep boxes', 'Blackout & quiet', 'Linen, blanket, eye mask'], to: '/booking?type=sleep', cta: 'Book a box', type: 'sleep' },
]
export default function Spaces() {
  return <div className="mx-auto max-w-6xl px-5 py-16">
    <Heading eyebrow="Our spaces" title="Three ways to find your ma">Each space is designed around one idea: less noise, more of what matters.</Heading>
    <div className="mt-16 space-y-20">
      {rows.map((r, i) => {
        const rate = SPACES.find(s => s.type === r.type)?.pricePerHour
        return <section key={r.title} className="grid items-center gap-10 md:grid-cols-2">
          <Photo tone={r.tone} label={r.title} className={`h-80 ${i % 2 ? 'md:order-2' : ''}`} />
          <div><h2 className="text-4xl">{r.title}</h2><p className="mt-4 text-walnut/80">{r.text}</p>
            <ul className="mt-4 space-y-1 text-sm">{r.facts.map(f => <li key={f}>— {f}</li>)}</ul>
            <p className="mt-4 font-serif text-2xl">{rate ? `${money(rate)} / hour` : r.price}</p>
            <div className="mt-6"><LinkButton to={r.to}>{r.cta}</LinkButton></div></div>
        </section>
      })}
    </div></div>
}
