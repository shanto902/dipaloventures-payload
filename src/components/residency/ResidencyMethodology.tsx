import React from 'react'
import sectorEnergy from '@/assets/sector-energy.jpg'
import sectorClimate from '@/assets/sector-climate.jpg'
import { methodologySteps } from '@/lib/demo'

export function ResidencyMethodology() {
  return (
    <section className="container mx-auto px-4 py-20 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.06]"
        style={{
          backgroundImage: `url(${sectorEnergy.src}), url(${sectorClimate.src})`,
          backgroundPosition: 'left center, right center',
          backgroundSize: '40% auto, 40% auto',
          backgroundRepeat: 'no-repeat, no-repeat',
        }}
      />
      <div className="relative max-w-3xl mb-12">
        <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">
          Methodology
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
          Our <span className="italic">process</span>, end to end.
        </h2>
        <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
          From founder application to portfolio support — a transparent flow that pairs disciplined
          screening with deep technical diligence.
        </p>
      </div>

      <ol className="relative grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {methodologySteps.map((s, i, arr) => (
          <li
            key={s.n}
            className="relative bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col"
          >
            <div className="font-mono text-xs text-amber-400 font-bold tracking-widest mb-3">
              PHASE {s.n}
            </div>
            <div className="font-serif text-xl font-medium leading-tight text-neutral-900 mb-2">
              {s.t}
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{s.b}</p>
            {i < arr.length - 1 && (
              <span
                className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 text-amber-400 text-lg z-10"
                aria-hidden
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
