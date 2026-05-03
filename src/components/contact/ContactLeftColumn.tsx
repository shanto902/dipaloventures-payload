import React from 'react'
import { emailCards, MAP_DIRECTIONS } from '@/lib/demo'

const GOLD = '#A07800'

export function ContactLeftColumn() {
  return (
    <div className="flex flex-col gap-5 min-w-0 md:w-full">
      {/* Hero */}
      <div className="pb-6 border-b border-neutral-200">
        <div className="font-mono uppercase text-neutral-500 mb-3 text-xs tracking-[0.2em] font-bold">
          Contact
        </div>
        <h1 className="text-4xl md:text-5xl font-medium text-neutral-900 leading-tight">
          Let's talk.
          <br />
          <span className="text-amber-400">Hard tech is worth it.</span>
        </h1>
        <p className="mt-3 text-neutral-500 text-base">
          We reply within 3 business days. We read every message.
        </p>
      </div>

      {/* Email cards */}
      <div className="flex flex-col gap-3">
        {emailCards.map((c) => (
          <div
            key={c.email}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-neutral-200 rounded-xl p-4 shadow-sm"
          >
            <div className="min-w-0">
              <div className="font-mono uppercase text-xs tracking-[0.2em] text-amber-400 font-bold">
                {c.eyebrow}
              </div>
              <div className="text-neutral-900 mt-1 text-base font-medium">{c.title}</div>
              <div className="text-neutral-500 text-sm mt-0.5">{c.subtitle}</div>
            </div>
            <a
              href={`mailto:${c.email}`}
              className="shrink-0 text-amber-400 hover:text-amber-700 hover:underline text-sm font-medium transition-colors"
            >
              {c.email} →
            </a>
          </div>
        ))}
      </div>

      {/* Map block */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white border border-neutral-200 rounded-xl shadow-sm min-h-[260px]">
        <iframe
          title="Dipalo Ventures — Chicago studio"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-87.6726%2C41.8847%2C-87.6626%2C41.8887&layer=mapnik&marker=41.8867%2C-87.6676"
          loading="lazy"
          className="w-full h-[200px] border-none flex-1"
        />
        <div className="flex items-center justify-between gap-4 p-4 border-t border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-3 min-w-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={GOLD}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="min-w-0">
              <div className="text-neutral-900 truncate text-sm font-medium">mHUB Chicago</div>
              <div className="text-neutral-500 text-xs mt-0.5">
                1623 W Fulton St, Suite 237 · Chicago, IL 60612
              </div>
            </div>
          </div>
          <a
            href={MAP_DIRECTIONS}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-amber-400 hover:text-amber-700 hover:underline text-sm font-medium transition-colors"
          >
            Directions ↗
          </a>
        </div>
      </div>
    </div>
  )
}
