import React from 'react'
import sectorEnergy from '@/assets/sector-energy.jpg'
import sectorClimate from '@/assets/sector-climate.jpg'
import { ResidencyProcess } from './ResidencyProcess'

export function ResidencyMethodology() {
  return (
    <section className="bg-[#fcfbf9] px-6 md:px-12 py-8 border-t border-neutral-100">
      <div className="container mx-auto px-4">
        {/* Technical Header */}
        <div className="max-w-4xl mb-8">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
            Our Methodology
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.05] tracking-tighter">
            Going deep — <br />
            <span className="italic text-[#ffb012]">not just an analysis.</span>
          </h2>
        </div>

        {/* Methodology Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 ">
          <div className="group flex flex-col pt-8 border-t-2 border-neutral-100 hover:border-[#ffb012] transition-all duration-500">
            <p className="text-neutral-800 leading-relaxed font-light">
              Technical diligence, to us, means real engagement. We'll ask for your designs,
              schematics, IP filings, and data room access, and engage you with thoughtful,
              challenging questions across product requirements and manufacturing strategy.
            </p>
          </div>

          <div className="group flex flex-col pt-8 border-t-2 border-neutral-100 hover:border-[#ffb012] transition-all duration-500">
            <p className="text-neutral-800 leading-relaxed font-light">
              The Residency combines this upfront diligence with ongoing, hands-on support
              post-investment. We evaluate product requirements, system design, and engineering
              plans — then work alongside founders to address gaps and accelerate execution.
            </p>
          </div>

          <div className="group flex flex-col pt-8 border-t-2 border-neutral-100 hover:border-[#ffb012] transition-all duration-500">
            <p className="text-neutral-800 leading-relaxed font-light">
              A portion of our investment in a Residency startup can be used to address gaps
              identified in our audit. In partnership with MPC/AMC, founders gain access to contract
              manufacturing pathways, cost analysis, GTM refinement, and fundraising strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
