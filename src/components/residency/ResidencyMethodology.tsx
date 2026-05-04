import React from 'react'
import sectorEnergy from '@/assets/sector-energy.jpg'
import sectorClimate from '@/assets/sector-climate.jpg'
import { methodologySteps } from '@/lib/demo'

export function ResidencyMethodology() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
              Methodology
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-tight tracking-tight">
            Our <span className="italic  ">process</span>, end to end.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-neutral-500 leading-relaxed font-light border-l-2 border-amber-400/20 pl-6">
          From founder application to portfolio support — a transparent flow that pairs disciplined
          screening with deep technical diligence.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 border border-neutral-200 rounded-[2rem] overflow-hidden bg-[#fcfbf9]">
        {methodologySteps.map((s, i) => (
          <div
            key={s.n}
            className="group relative p-8 md:p-10 border-b border-r border-neutral-200 last:border-b-0 lg:border-b-0 transition-colors hover:bg-white"
          >
            {/* Phase Node */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-amber-500 font-bold tracking-widest">
                0{s.n}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 group-hover:bg-amber-400 transition-colors duration-500" />
            </div>

            <h3 className="  text-lg font-medium text-neutral-900 mb-3 group-hover:text-amber-500 transition-colors">
              {s.t}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-light">{s.b}</p>

            {/* Subtle path indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        ))}
      </div>
    </section>
  )
}
