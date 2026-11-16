import { BookOpen, Clock, Coffee, Leaf, Moon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Heading, LinkButton, Photo } from '../components/ui'

const three = [
  { Icon: Coffee, title: 'Study Café', text: 'Shared tables, slow-brewed coffee and a soft hum of calm.', to: '/menu', cta: 'See the menu', tone: 'ivory' as const },
  { Icon: BookOpen, title: 'Quiet Study Pods', text: 'Four private pods with warm light, power and total quiet.', to: '/booking?type=pod', cta: 'Book a pod', tone: 'sage' as const },
  { Icon: Moon, title: 'Sleep Boxes', text: 'Eight cocoon-like boxes for a restorative reset between tasks.', to: '/booking?type=sleep', cta: 'Book a box', tone: 'walnut' as const },
]
const values = [[Leaf, 'Calm by design', 'Natural wood, linen and low light.'], [Clock, 'Flexible hours', 'Book by the hour, any day, 08:00–22:00.'], [Coffee, 'Fuelled well', 'Fresh coffee, tea and light bites.']] as const

export default function Home() {
  return <>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
      <div className="animate-fade-up">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-sage-dark">Study Café · Pods · Sleep Boxes</p>
        <h1 className="text-5xl leading-tight md:text-7xl">A quiet place to focus, rest, and begin again.</h1>
        <p className="mt-6 max-w-md text-lg text-walnut/80">Ma (間) is the Japanese idea of meaningful space. We built three of them under one roof.</p>
        <div className="mt-8 flex flex-wrap gap-3"><LinkButton to="/booking">Book a space</LinkButton><LinkButton to="/spaces" variant="ghost">Explore spaces</LinkButton></div>
      </div>
      <Photo tone="sage" label="Hero interior photo" className="h-96 md:h-[32rem]" />
    </section>
    <section className="bg-ivory-deep/60 py-20"><div className="mx-auto max-w-6xl px-5">
      <Heading eyebrow="Three in one" title="Choose your kind of quiet" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {three.map(({ Icon, title, text, to, cta, tone }) => <article key={title} className="rounded-3xl bg-ivory p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <Photo tone={tone} label={title} className="h-48" />
          <div className="p-4"><Icon className="text-sage-dark" /><h3 className="mt-3 text-2xl">{title}</h3><p className="mt-2 text-sm text-walnut/80">{text}</p>
            <Link to={to} className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-sage-dark">{cta} →</Link></div>
        </article>)}
      </div></div></section>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-3">
      {values.map(([Icon, t, d]) => <div key={t} className="text-center"><Icon className="mx-auto text-sage-dark" /><h3 className="mt-3 text-2xl">{t}</h3><p className="mt-1 text-sm text-walnut/80">{d}</p></div>)}
    </section>
    <section className="bg-walnut-dark py-16 text-center text-ivory"><h2 className="text-4xl !text-ivory">Ready for your quiet hour?</h2><div className="mt-6 flex justify-center gap-3"><LinkButton to="/booking" variant="ghost">Check availability</LinkButton><LinkButton to="/membership" variant="ghost">View memberships</LinkButton></div></section>
  </>
}
