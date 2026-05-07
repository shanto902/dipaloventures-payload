'use client'

import React, { useState, useId } from 'react'

const capabilities = [
  {
    n: '01',
    group: 'Technology & Product',
    headline: 'Technology & Product',

    items: [
      'Product requirements definition and refinement',
      'UX evaluation and heuristic analysis',
      'Product and system design, design reviews, BOM optimization',
      'Software debugging and technical stabilization',
      'Customer and market validation',
      'Engineering team formation and structuring',
      'Contracting and commercialization support',
      'System architecture and design reviews',
      'Data science and AI use case evaluation',
    ],
  },
  {
    n: '02',
    group: 'Manufacturing & Operations',
    headline: 'Manufacturing & Operations',

    items: [
      'Initial production and early manufacturing runs',
      'Hardware subsystem development',
      'Returns processing and operational system setup',
    ],
  },
  {
    n: '03',
    group: 'Business & Growth',
    headline: 'Business & Growth',
    items: [
      'VC readiness and investor positioning',
      'Business and financial planning',
      'Go-to-market strategy',
      'Fundraising strategy',
      'International market expansion',
    ],
  },
]

export default function ResidencyCapabilities() {
  const [activeTab, setActiveTab] = useState(0)
  const baseId = useId()
  const data = capabilities[activeTab]

  return (
    <section className="bg-white py-8 px-6 md:px-12 relative border-t border-neutral-100">
      <div className="container mx-auto">
        {/* Split Header Design - Tightened */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-xl">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
              CAPABILITIES
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tighter">
              What we cover, <br />
              <span className="italic text-[#ffb012]">end to end.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base text-neutral-700 leading-relaxed font-light border-l-2 border-[#ffb012]/20 pl-6">
              Across three disciplines — embedded with your team from prototype to production.
            </p>
          </div>
        </div>

        {/* Tab Toggle - Tightened */}
        <div className="flex md:justify-center mb-10">
          <div
            role="tablist"
            className="relative p-1 bg-neutral-50 rounded-2xl flex border border-neutral-200 w-full max-w-md shadow-sm"
          >
            <div
              className="absolute top-1 bottom-1 bg-[#ffb012] rounded-xl shadow-sm transition-all duration-500 ease-in-out"
              style={{
                width: 'calc(33.333% - 4px)',
                left: `calc(${activeTab * 33.333}% + 2px)`,
              }}
            />
            {capabilities.map((c, i) => (
              <button
                key={c.group}
                role="tab"
                aria-selected={activeTab === i}
                onClick={() => setActiveTab(i)}
                className={`relative z-10 flex-1 text-xs  tracking-widest uppercase font-mono font-bold py-3 px-2 transition-colors duration-300 ${
                  activeTab === i ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {c.group.split(' & ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area - Tightened Grid */}
        <div
          key={activeTab}
          className="grid lg:grid-cols-[0.6fr_1.4fr] gap-12 items-start animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          {/* Left: Phase Title */}
          <div className="pt-2">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-2 font-bold">
              Phase {data.n}
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
              {data.headline}
            </h3>
          </div>

          {/* Right: Bullet List (Compact Box) */}
          <div className="bg-[#fcfbf9] border border-neutral-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex-1">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {data.items.map((item, idx) => (
                <li key={idx} className="group flex gap-4 items-start">
                  <div className="text-[#ffb012] font-mono text-xs font-bold mt-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base text-neutral-800 leading-tight font-light">
                    {item}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
