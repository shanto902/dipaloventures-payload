import React from 'react'
import { ContactMapClient } from './ContactMapClient'

export function ContactLeftColumn() {
  return (
    <div className="flex flex-col pt-0 lg:pt-8">
      {/* Editorial Headline */}
      <div className="max-w-xl mb-8">
        <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
          Let's talk. <br />
          Hard tech is <span className="italic text-[#ffb012]">worth it.</span>
        </h1>
      </div>

      {/* Map and Address Container - Dossier Style */}
      <div className="relative group overflow-hidden bg-white border border-neutral-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-700 max-w-2xl">
        <div className="relative h-56 md:h-64 overflow-hidden">
          <div className="absolute inset-0 bg-neutral-900/10 z-10 pointer-events-none mix-blend-overlay" />
          <ContactMapClient />

          {/* Coordinate Overlay */}
          <div className="absolute bottom-4 left-4 z-20 font-mono text-xs uppercase tracking-widest text-neutral-900 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
            41.8867° N, 87.6695° W
          </div>
        </div>

        <div className="p-6 md:p-8 bg-white border-t border-neutral-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] font-bold mb-1">
                  mHUB Chicago
                </div>
                <div className="text-neutral-900 text-sm font-medium leading-relaxed">
                  1623 W Fulton St, Suite 237 <br />
                  Chicago, IL 60612
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=mHUB+Chicago"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-neutral-900 text-white rounded-full font-mono text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all shadow-sm group/btn shrink-0"
            >
              <span>Directions</span>
              <span className="text-neutral-500 group-hover/btn:text-[#ffb012] transition-colors">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
