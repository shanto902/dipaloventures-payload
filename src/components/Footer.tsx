import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  return (
    <footer className="bg-[#fcfbf9] pt-12 px-6 md:px-12 pb-6 border-t border-neutral-200/60">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_2fr] gap-12 lg:gap-24 pb-12">
          <div>
            <Logo size={60} />
            <p className="mt-6 max-w-xs text-base text-neutral-800 leading-relaxed font-light">
              Early-stage hard tech venture capital firm in product manufacturing for people and the
              planet across energy, climate, & Physical AI.
            </p>
            {/* <div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {['Chicago', 'Lisbon', 'Global'].map((loc) => (
                  <div
                    key={loc}
                    className="group flex items-center gap-2 px-3 py-1.5 bg-neutral-100/50 border border-neutral-200/50 rounded-lg transition-all hover:border-[#ffb012]/40"
                  >
                    <div className="w-1 h-1 bg-[#ffb012] rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest font-bold">
                      {loc}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          <div>
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-neutral-800 mb-6 font-bold">
              Explore
            </div>
            <ul className="space-y-4">
              {[
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/media', label: 'Media' },
                { href: '/residency', label: 'Residency' },
                { href: '/team', label: 'Team' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-base text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-neutral-800 mb-6 font-bold">
              Elsewhere
            </div>
            <ul className="space-y-4">
              {[
                { href: 'https://www.linkedin.com/company/dipaloventures/', label: 'LinkedIn ↗' },
                { href: 'https://www.youtube.com/@dipaloventures', label: 'YouTube ↗' },
                { href: 'https://medium.com/@dipaloventures', label: 'Medium ↗' },
                { href: 'https://www.instagram.com/dipaloventures/', label: 'Instagram ↗' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#ffb012] mb-6 font-bold">
              Newsletter
            </div>
            <div className="text-base text-neutral-900 font-medium mb-2">
              Letters from the Hard Side
            </div>
            <p className="text-base text-neutral-500 leading-relaxed mb-8 font-light">
              Quarterly notes on deep tech, manufacturing, and the founders we back.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200/60 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-mono text-neutral-600 tracking-[0.2em] font-bold uppercase">
            © {new Date().getFullYear()} Dipalo Ventures. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
