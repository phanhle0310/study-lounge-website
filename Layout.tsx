import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { nav, site } from '../config/site'
import { LinkButton } from './ui'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0); setOpen(false) }, [pathname])
  const link = ({ isActive }: { isActive: boolean }) => `text-sm tracking-wide transition hover:text-sage-dark ${isActive ? 'text-sage-dark' : 'text-walnut'}`
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-walnut/10 bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-baseline gap-2"><span className="font-serif text-3xl text-walnut-dark">{site.jp}</span><span className="text-sm uppercase tracking-[0.25em]">{site.name}</span></Link>
          <nav className="hidden items-center gap-7 lg:flex">{nav.map(([l, to]) => <NavLink key={to} to={to} end={to === '/'} className={link}>{l}</NavLink>)}</nav>
          <div className="hidden lg:block"><LinkButton to="/booking">Book now</LinkButton></div>
          <button className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && <nav className="flex flex-col gap-4 border-t border-walnut/10 px-5 py-5 lg:hidden">{nav.map(([l, to]) => <NavLink key={to} to={to} end={to === '/'} className={link}>{l}</NavLink>)}</nav>}
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="bg-walnut-dark text-ivory/80">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
          <div><p className="font-serif text-3xl text-ivory">{site.jp} {site.name}</p><p className="mt-2 text-sm">Study. Focus. Rest.</p></div>
          <div className="text-sm leading-7"><p>{site.address}</p><p>{site.hoursText}</p><p>{site.email}</p></div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">{nav.map(([l, to]) => <Link key={to} to={to} className="hover:text-ivory">{l}</Link>)}</div>
        </div>
        <p className="border-t border-ivory/10 py-4 text-center text-xs">© {new Date().getFullYear()} {site.name}. {site.currencyNote}.</p>
      </footer>
    </div>
  )
}
