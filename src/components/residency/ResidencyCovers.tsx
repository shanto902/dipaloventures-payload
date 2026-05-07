import React from 'react'
import Link from 'next/link'
import { residencyCovers } from '@/lib/demo'

export function ResidencyCovers() {
  return (
    <section
      id="residency-program"
      className="relative py-8 overflow-hidden bg-white border-b border-neutral-100 px-5 md:px-12"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Module 01: Editorial Scope */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb012] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                Archive.04 · Program Scope
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-8">
              Engineering, <br />
              supply chain, <br />
              <span className="italic text-[#ffb012] ">execution.</span>
            </h2>

            <p className="text-lg text-neutral-500 leading-relaxed font-light italic border-l-2 border-[#ffb012]/10 pl-6 mb-8">
              Residency isn&apos;t an accelerator and it isn&apos;t advisory hours. It&apos;s
              operators embedded with your team, doing the technical work alongside you — from early
              design reviews to your first production runs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/team"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full font-mono text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-neutral-900/10"
              >
                <span>Operational Team</span>
                <span className="text-neutral-500 group-hover:text-[#ffb012] transition-colors">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* Module 02: Technical Coverage Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {residencyCovers.map((x, i) => (
                <div
                  key={x.t}
                  className="group relative bg-white border border-neutral-100 rounded-[2.5rem] p-8 lg:p-10 transition-all duration-700 hover:border-[#ffb012] hover:shadow-2xl hover:shadow-neutral-900/5"
                >
                  {/* Technical Metadata */}
                  <div className="absolute top-8 right-8 font-mono text-xs text-neutral-100 group-hover:text-[#ffb012]/20 transition-colors font-bold uppercase tracking-widest">
                    Scope_0{i + 1}
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-10 group-hover:bg-[#ffb012]/5 group-hover:border-[#ffb012] transition-all duration-500">
                    <span className="text-[#ffb012] group-hover:text-amber-600 transition-colors font-mono text-sm font-bold">
                      ✓
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-4 group-hover:text-[#ffb012] transition-colors duration-500">
                    {x.t}
                  </h3>

                  <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-light group-hover:text-neutral-800 transition-colors duration-500 italic">
                    {x.b}
                  </p>

                  {/* Subtle Blueprint Accent */}
                  <div className="absolute bottom-6 right-8 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-1 h-1 rounded-full bg-[#ffb012]/40" />
                    <div className="w-1 h-1 rounded-full bg-[#ffb012]/20" />
                    <div className="w-1 h-1 rounded-full bg-[#ffb012]/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
