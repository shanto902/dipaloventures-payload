import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  return (
    <footer className="relative mt-24 bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.5fr]">
        <div>
          <Logo size={48} />
          <p className="mt-6 max-w-xs text-base text-neutral-500 leading-relaxed">
            Hard tech investors.
            <br />
            Chicago · Lisbon · Global.
          </p>
        </div>

        <div>
          <div className="mb-6 text-base font-semibold text-neutral-900">Explore</div>
          <ul className="space-y-3.5">
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
                  className="text-base text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-6 text-base font-semibold text-neutral-900">Elsewhere</div>
          <ul className="space-y-3.5">
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
                  className="text-base text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-6 text-base font-semibold text-neutral-900">
            Letters from the Hard Side
          </div>
          <p className="mb-6 text-base text-neutral-500 leading-relaxed">
            Quarterly notes on deep tech, manufacturing, and the founders we back.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-neutral-100" />
      <div className="container mx-auto px-4 py-10 text-base text-neutral-400 font-medium">
        <span>© {new Date().getFullYear()} Dipalo Ventures. All rights reserved.</span>
      </div>
    </footer>
  )
}
