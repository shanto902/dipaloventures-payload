import React from 'react'

const stats = [
  { value: '3,500+', label: 'Deals Sourced' },
  { value: '$238.6M', label: 'Total Raised by Portfolio' },
  { value: '$24.9M', label: 'Portfolio Revenue' },
  { value: '50%', label: 'Founder Diversity' },
  { value: '400+', label: 'U.S. Patents' },
  { value: '256', label: 'Total Employees' },
]

export function PortfolioStats() {
  return (
    <div className="py-12 border-y border-neutral-100/50">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:items-start lg:justify-between gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-12">
        {stats.map((s) => (
          <div key={s.label} className="group flex flex-col gap-2 min-w-fit">
            <div className="text-2xl md:text-3xl italic text-neutral-900 group-hover:text-[#ffb012] transition-colors duration-300">
              {s.value}
            </div>
            <div className="font-mono text-xs md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors duration-300 leading-relaxed whitespace-nowrap">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
