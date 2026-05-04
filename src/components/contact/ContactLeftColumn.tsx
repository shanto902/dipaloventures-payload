import React from 'react'
import { emailCards, MAP_DIRECTIONS } from '@/lib/demo'

export function ContactLeftColumn() {
  return (
    <div className="flex flex-col gap-10 md:sticky md:top-32">
      {/* Editorial Headline */}
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
            Contact · Inquiry Protocol
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-8">
          Let's talk. <br />
          Hard tech is <span className="italic text-amber-400   ">worth it.</span>
        </h1>

        <p className="text-lg text-neutral-500 leading-relaxed font-light italic border-l-2 border-amber-400/10 pl-6 mb-12">
          We process all inquiries within 72 hours. Our network is built on direct
          founder-to-operator communication.
        </p>
      </div>

      {/* High-Density Email Archive */}
      <div className="space-y-4">
        {emailCards.map((c, i) => (
          <div
            key={c.email}
            className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-neutral-100 rounded-2xl p-6 hover:border-amber-400 hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-700"
          >
            {/* Technical ID */}
            <div className="absolute top-0 right-0 p-3 font-mono text-xs text-neutral-100 group-hover:text-amber-400/10 transition-colors font-bold">
              COM.0{i + 1}
            </div>

            <div className="min-w-0">
              <div className="font-mono   text-xs uppercase tracking-[0.2em] text-amber-400 font-bold mb-1">
                {c.eyebrow}
              </div>
              <div className="text-neutral-900 text-lg font-semibold leading-tight">{c.title}</div>
              <div className="text-neutral-400 text-xs font-light mt-1">{c.subtitle}</div>
            </div>

            <a
              href={`mailto:${c.email}`}
              className="shrink-0 inline-flex items-center gap-2 font-mono text-xs text-neutral-400 group-hover:text-amber-500 transition-colors font-bold"
            >
              <span>{c.email}</span>
              <span className="text-neutral-200 group-hover:text-amber-400 transition-colors">
                ↗
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
