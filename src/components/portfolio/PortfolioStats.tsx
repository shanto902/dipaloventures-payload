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
    <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-neutral-200 rounded-xl p-6 text-center shadow-sm"
        >
          <div className="text-2xl md:text-3xl font-bold text-amber-400">{s.value}</div>
          <div className="mt-3 font-mono text-xs uppercase tracking-widest text-neutral-500 font-medium">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
