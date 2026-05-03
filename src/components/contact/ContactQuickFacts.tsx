import React from 'react'
import { facts } from '@/lib/demo'

export function ContactQuickFacts() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
      <div className="font-mono uppercase text-neutral-500 mb-4 text-xs tracking-[0.2em] font-bold">
        Quick facts
      </div>
      <div className="grid grid-cols-2 gap-3">
        {facts.map((f) => (
          <div key={f.label} className="bg-neutral-50 rounded-lg p-3.5 border border-neutral-100">
            <div className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
              {f.label}
            </div>
            <div className="text-neutral-900 mt-1 text-sm font-medium">{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
