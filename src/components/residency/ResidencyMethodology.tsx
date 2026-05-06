import React from 'react'
import sectorEnergy from '@/assets/sector-energy.jpg'
import sectorClimate from '@/assets/sector-climate.jpg'
import { ResidencyProcess } from './ResidencyProcess'

export function ResidencyMethodology() {
  return (
    <section className="px-5 bg-[#fcfbf9] md:px-12">
      <main className="container  bg- mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                Program Scope
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-tight tracking-tight">
              Engineering, supply chain, <span className="italic  text-amber-400">execution.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base md:text-lg text-neutral-800 leading-relaxed font-light border-l-2 border-amber-400/20 pl-6">
            Operators embedded with your team — from early design reviews to your first production
            runs.
          </p>
        </div>

        <ResidencyProcess />
      </main>
    </section>
  )
}
