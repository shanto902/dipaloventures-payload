'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logoImg from '@/assets/dipalo-logo.png' // Using the actual logo

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/residency', label: 'Residency' },
  { href: '/team', label: 'Team' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
] as const

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm ' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <Image
            src={logoImg}
            alt="Dipalo Ventures"
            height={32}
            className="shrink-0 transition-transform group-hover:scale-105 w-auto h-8"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.slice(1).map((l, i) => {
            const isActive = pathname === l.href
            return (
              <Link
                key={`${l.href}-${l.label}-${i}`}
                href={l.href}
                className={`px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'text-neutral-900 font-medium'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className="ml-4 inline-flex items-center gap-2 px-4 py-1.5 bg-amber-600 text-white text-xs font-medium uppercase tracking-wider rounded-full hover:bg-amber-700 transition-colors"
          >
            Submit pitch
            <span aria-hidden>→</span>
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 text-neutral-900"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l, i) => {
              const isActive = pathname === l.href
              return (
                <Link
                  key={`${l.href}-${l.label}-${i}`}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 text-base transition-colors ${
                    isActive ? 'text-neutral-900 font-medium' : 'text-neutral-500'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
