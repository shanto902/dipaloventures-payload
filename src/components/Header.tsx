'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import logoImg from '@/assets/dipalo-logo.png'

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
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[50] transition-all px-6 md:px-12 duration-500 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full shadow-none'
        } ${scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group relative z-[60]"
            onClick={() => setOpen(false)}
          >
            <Image
              src={logoImg}
              alt="Dipalo Ventures"
              height={120}
              className="shrink-0 transition-transform group-hover:scale-105 w-auto h-12"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((l) => {
              const isActive = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-2 text-sm tracking-tight transition-colors rounded-full ${
                    isActive
                      ? 'text-neutral-900 bg-neutral-100 font-medium'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
            <a
              href="/pitch"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#ffb012] hover:text-white text-black font-mono text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-neutral-900 transition-all duration-500 shadow-lg shadow-[#ffb012]/20"
            >
              Submit pitch
              <ArrowRight size={14} />
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle menu"
            className="md:hidden relative z-[60] p-2 -mr-2 text-neutral-900"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[55] bg-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex flex-col h-full pt-32 pb-12 px-6 container mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-12 font-bold">
            Navigation
          </div>

          <nav className="flex flex-col gap-6">
            {links.map((l, i) => {
              const isActive = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between py-2 border-b border-neutral-100 transition-all duration-500 ${
                    open ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span
                    className={`text-4xl   tracking-tight ${isActive ? 'text-[#ffb012]' : 'text-neutral-900'}`}
                  >
                    {l.label}
                  </span>
                  <ArrowRight
                    className={`text-[#ffb012] transition-transform duration-300 ${isActive ? 'translate-x-0' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-12">
            <a
              href="/pitch"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-3 w-full py-5 bg-neutral-900 text-white rounded-2xl font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#ffb012] transition-all duration-500 shadow-xl"
            >
              Submit Pitch <ArrowRight size={16} />
            </a>

            <div className="mt-10 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold">
              <span>© 2024 Dipalo Ventures</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#ffb012] transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-[#ffb012] transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
