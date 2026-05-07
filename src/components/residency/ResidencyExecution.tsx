'use client'

import React from 'react'

export function ResidencyExecution() {
  return (
    <section className="bg-white px-6 md:px-12 py-8 border-t border-neutral-100">
      <div className="container mx-auto px-4">
        {/* Split Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-8">
          <div className="max-w-xl">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
              Program Scope
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tighter">
              Engineering, supply chain, <br />
              <span className="italic text-[#ffb012]">execution.</span>
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-light pl-6 border-l-2 border-[#ffb012]/20 lg:pl-6">
              Operators embedded with your team — from early design reviews to first production
              runs.
            </p>
          </div>
        </div>

        {/* Scope Cards (Compact) */}
      </div>
    </section>
  )
}
