import React from 'react'
import { emailCards, MAP_DIRECTIONS } from '@/lib/demo'

export function ContactLeftColumn() {
  return (
    <div className="flex flex-col gap-6">
      {/* Editorial Headline */}
      <div className="max-w-xl">
        <h1 className="text-3xl  md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-6">
          Let's talk. <br />
          Hard tech is <span className="italic text-[#ffb012]   ">worth it.</span>
        </h1>

        <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light ">
          We reply within 3 business days. We read every message.
        </p>
      </div>

      <hr className="border border-neutral-200/60 my-4" />
      {/* High-Density Email Archive */}
      <div className="space-y-4 md:sticky md:top-32">
        {emailCards.map((c, i) => (
          <div
            key={c.email}
            className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-neutral-100 rounded-2xl p-6 hover:border-[#ffb012] hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-700"
          >
            <div className="min-w-0">
              <div className="font-mono   text-xs uppercase tracking-[0.2em] text-[#ffb012] font-bold mb-1">
                {c.eyebrow}
              </div>
              <div className="text-neutral-900 text-lg font-semibold leading-tight">{c.title}</div>
            </div>

            <a
              href={`mailto:${c.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 font-mono text-xs text-neutral-600 group-hover:text-[#ffb012] transition-colors font-bold"
            >
              <span>{c.email}</span>
              <span className="text-neutral-400 group-hover:text-[#ffb012] transition-colors">
                ↗
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
