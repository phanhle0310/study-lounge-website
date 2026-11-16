import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Inbox, Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'ghost'
const base = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50'
const styles: Record<Variant, string> = { solid: 'bg-walnut text-ivory hover:bg-walnut-dark', ghost: 'border border-walnut/30 text-walnut hover:bg-walnut hover:text-ivory' }

export function LinkButton({ to, variant = 'solid', children }: { to: string; variant?: Variant; children: ReactNode }) {
  return <Link to={to} className={`${base} ${styles[variant]}`}>{children}</Link>
}
export function Button({ variant = 'solid', className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button {...p} className={`${base} ${styles[variant]} ${className}`} />
}
export function Heading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="mx-auto max-w-2xl animate-fade-up text-center">
    {eyebrow && <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sage-dark">{eyebrow}</p>}
    <h1 className="text-4xl md:text-5xl">{title}</h1>
    {children && <p className="mt-4 text-walnut/80">{children}</p>}
  </div>
}
const tones = { sage: 'from-sage/70 to-sage-dark/80', walnut: 'from-walnut/80 to-walnut-dark', ivory: 'from-ivory-deep to-sage/40' }
// Placeholder for photography. Later: swap for <img src="/images/your-photo.jpg" />
export function Photo({ tone = 'sage', label, className = '' }: { tone?: keyof typeof tones; label: string; className?: string }) {
  return <div className={`flex items-end rounded-3xl bg-gradient-to-br p-6 ${tones[tone]} ${className}`}><span className="font-serif text-lg text-ivory/90">{label}</span></div>
}
export function Notice({ kind, children, action }: { kind: 'loading' | 'error' | 'empty' | 'success'; children: ReactNode; action?: ReactNode }) {
  const Icon = { loading: Loader2, error: AlertCircle, empty: Inbox, success: CheckCircle2 }[kind]
  const color = kind === 'error' ? 'text-red-800 bg-red-50' : kind === 'success' ? 'text-sage-dark bg-sage/15' : 'text-walnut bg-ivory-deep'
  return <div role={kind === 'error' ? 'alert' : 'status'} className={`flex flex-col items-center gap-3 rounded-2xl p-8 text-center ${color}`}>
    <Icon className={kind === 'loading' ? 'animate-spin' : ''} size={28} /><div>{children}</div>{action}</div>
}
