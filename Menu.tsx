import { useState } from 'react'
import { Heading } from '../components/ui'
import { MENU } from '../data/content'
import { money } from '../lib/pricing'
export default function Menu() {
  const [cat, setCat] = useState<string>(MENU[0].cat)
  const group = MENU.find(m => m.cat === cat)
  return <div className="mx-auto max-w-3xl px-5 py-16">
    <Heading eyebrow="Study Café" title="Menu">Simple, seasonal, and made to be sipped slowly.</Heading>
    <div className="mt-10 flex justify-center gap-2">{MENU.map(m => <button key={m.cat} onClick={() => setCat(m.cat)} className={`rounded-full px-5 py-2 text-sm transition ${cat === m.cat ? 'bg-walnut text-ivory' : 'border border-walnut/30 hover:bg-ivory-deep'}`}>{m.cat}</button>)}</div>
    {group && group.items.length > 0 ? <ul className="mt-10 divide-y divide-walnut/10">{group.items.map(([n, d, p]) => <li key={n} className="flex justify-between gap-6 py-5"><div><h3 className="text-2xl">{n}</h3><p className="text-sm text-walnut/70">{d}</p></div><span className="font-serif text-xl">{money(p)}</span></li>)}</ul> : <p className="mt-10 text-center">Nothing here yet.</p>}
  </div>
}
