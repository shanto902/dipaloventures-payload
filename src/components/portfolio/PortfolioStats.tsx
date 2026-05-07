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
    <div className="py-10 border-y border-neutral-100/50">
      <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
        {stats.map((s) => (
          <div key={s.label} className="group flex flex-col gap-1">
            <div className="text-2xl md:text-3xl italic text-neutral-900 group-hover:text-[#ffb012] transition-colors duration-300">
              {s.value}
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors duration-300">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
