import React from 'react'

const stats = [
  { value: '$413M', label: 'Portfolio Valuation' },
  { value: '$238.6M', label: 'Total Raised by Portfolio' },
  { value: '$24.9M', label: 'Portfolio Revenue' },
  { value: '256', label: 'Total Employees' },
  { value: '3,500+', label: 'Deals Sourced' },
  { value: '50%', label: 'Diverse Founders' },
]

export function PortfolioStats() {
  return (
    <div className=" bg-[#fcfbf9] border border-neutral-200 rounded-[2rem] overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 divide-x divide-y md:divide-y-0 divide-neutral-200">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group relative p-8 md:p-10 transition-colors hover:bg-white flex flex-col items-center text-center justify-center"
          >
            {/* Subtle Hover Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="text-3xl md:text-4xl   italic text-neutral-900 group-hover:text-amber-400 transition-colors duration-300">
              {s.value}
            </div>
            <div className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold leading-tight max-w-[120px]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
