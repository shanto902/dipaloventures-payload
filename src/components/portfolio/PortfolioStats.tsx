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
    <div className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-12 gap-x-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group flex flex-col items-center text-center justify-center transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="text-3xl md:text-4xl italic text-neutral-900 group-hover:text-amber-400 transition-colors duration-300">
              {s.value}
            </div>
            <div className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-neutral-600 font-bold whitespace-nowrap">
              {s.label}
            </div>
            <div className="mt-4 h-px w-8 bg-amber-400/30 group-hover:w-12 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  )
}
