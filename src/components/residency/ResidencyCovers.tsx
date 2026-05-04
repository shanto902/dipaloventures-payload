import React from 'react'
import Link from 'next/link'
import { residencyCovers } from '@/lib/demo'

export function ResidencyCovers() {
  return (
    <section id="residency-program" className="container mx-auto px-4 py-24 md:py-32">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
        <div className="sticky top-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
              Program Scope
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
            Engineering, <br />
            supply chain, <br />
            <span className="italic   text-amber-400">execution.</span>
          </h2>
          <p className="mt-8 text-lg text-neutral-500 leading-relaxed font-light italic">
            Residency isn&apos;t an accelerator and it isn&apos;t advisory hours. It&apos;s
            operators embedded with your team, doing the technical work alongside you — from early
            design reviews to your first production runs.
          </p>
          <div className="mt-10">
            <Link
              href="/team"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-neutral-200 text-xs font-mono uppercase tracking-widest text-neutral-900 hover:bg-amber-400 hover:border-amber-400 transition-all duration-500 group font-bold"
            >
              See who runs Residency
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-neutral-100 border border-neutral-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-neutral-900/5">
          {residencyCovers.map((x) => (
            <div
              key={x.t}
              className="bg-white p-10 flex flex-col group transition-all duration-500 hover:bg-amber-50/30"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100 group-hover:bg-amber-400 group-hover:border-amber-400 transition-all duration-500">
                  <span className="text-amber-500 group-hover:text-neutral-900 transition-colors text-xs font-mono font-bold">
                    ✓
                  </span>
                </div>
              </div>
              <h3 className="  text-xl md:text-2xl font-medium text-neutral-900 mb-4 transition-colors group-hover:text-amber-500">
                {x.t}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light group-hover:text-neutral-600 transition-colors">
                {x.b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
