import { Heading, LinkButton, Photo } from '../components/ui'
export default function About() {
  return <div className="mx-auto max-w-5xl px-5 py-16">
    <Heading eyebrow="About" title="Space, on purpose">Ma (間) describes the pause between things — the quiet that gives everything else meaning.</Heading>
    <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
      <Photo tone="walnut" label="Founder / interior photo" className="h-80" />
      <div className="space-y-4 text-walnut/85"><p>We started Ma Space because good focus and good rest are both hard to find in the same place.</p><p>So we built one home for both: a café that welcomes you, pods that protect your attention, and sleep boxes that let you recharge.</p><p>Every material — walnut, linen, paper, plants — is chosen to lower the volume of the day.</p><div className="pt-2"><LinkButton to="/contact" variant="ghost">Say hello</LinkButton></div></div>
    </div></div>
}
