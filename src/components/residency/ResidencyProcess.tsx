import React from 'react'
import { methodologySteps } from '@/lib/demo'

export function ResidencyProcess() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 py-8">
      {methodologySteps.map((s, i) => (
        <div
          key={s.n}
          className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1"
        >
          {/* Phase Header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-amber-500 font-bold tracking-[0.2em]">
              {s.n}
            </span>
            <div className="h-px flex-1 bg-neutral-100 group-hover:bg-amber-400/30 transition-colors" />
          </div>

          <h3 className="text-lg font-semibold text-neutral-900 mb-3 group-hover:text-amber-500 transition-colors">
            {s.t}
          </h3>

          <p className="text-base text-neutral-800 leading-relaxed font-light">{s.b}</p>

          {/* Technical Accent */}
          <div className="mt-6 w-8 h-1 bg-neutral-100 group-hover:w-full group-hover:bg-amber-400/50 transition-all duration-500" />
        </div>
      ))}
    </div>
  )
}
