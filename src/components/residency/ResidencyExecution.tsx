'use client'

import React from 'react'

const scopeCards = [
  {
    n: '01',
    t: 'Engineering Audits',
    d: 'Architecture, design, and IP reviews — pre- and post-investment.',
  },
  {
    n: '02',
    t: 'Supply Chain Mapping',
    d: 'Vendor selection, lead time analysis, and risk mitigation.',
  },
  {
    n: '03',
    t: 'Design + Manufacturing',
    d: 'DFM, tolerancing, prototyping, and pilot production support.',
  },
  {
    n: '04',
    t: 'Gap Identification',
    d: "What you don't know you don't know — surfaced early.",
  },
]

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
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-light pl-6 border-l-2 border-[#ffb012]/20 lg:pl-6">
              Operators embedded with your team — from early design reviews to first production
              runs.
            </p>
          </div>
        </div>

        {/* Scope Cards (Compact) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scopeCards.map((s) => (
            <div
              key={s.n}
              className="group relative flex flex-col p-6 bg-[#fcfbf9] border border-neutral-200/60 rounded-2xl transition-all duration-500 hover:border-[#ffb012]/50 hover:shadow-lg hover:shadow-amber-900/5"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#ffb012] font-bold tracking-[0.2em]">
                  {s.n}
                </span>
                <div className="w-1 h-1 rounded-full bg-neutral-300 group-hover:bg-[#ffb012] animate-pulse" />
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-[#ffb012] transition-colors">
                {s.t}
              </h3>

              <p className="text-base md:text-lg text-neutral-800 leading-snug font-light">{s.d}</p>

              {/* Technical Bottom Accent */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px w-6 bg-[#ffb012]/20 group-hover:w-10 transition-all duration-500" />
                <div className="h-px w-1 bg-[#ffb012]/10 group-hover:bg-[#ffb012]/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
