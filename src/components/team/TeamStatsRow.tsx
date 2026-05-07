import React from 'react'
import { heroStats } from '@/lib/demo'

export const TeamStatsRow = () => (
  <div className="mt-8 border border-neutral-100 bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm">
    <div className="flex flex-wrap md:flex-nowrap divide-x divide-neutral-100">
      {heroStats.map((s) => (
        <div
          key={s.l}
          className="flex-1 min-w-[120px] p-4 md:p-6 group transition-all duration-500 hover:bg-white"
        >
          <div className="flex flex-col gap-1">
            <div className="text-2xl md:text-3xl font-semibold text-neutral-900 group-hover:text-[#ffb012] transition-colors tracking-tight">
              {s.n}
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold leading-tight">
              {s.l}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
