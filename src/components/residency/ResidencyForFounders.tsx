'use client'

import React from 'react'
import Link from 'next/link'
import { lookFor } from '@/lib/demo'

export function ResidencyForFounders() {
  return (
    <section className="relative py-8 px-5 md:px-12 overflow-hidden bg-white">
      {/* Background Studio Tint */}
      <div className="absolute inset-0 bg-[#fcfbf9]/50 border-t border-neutral-100 -z-10" />

      <div className="container mx-auto px-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb012] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                Founder Partnership
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              We&apos;re looking for <br />
              <span className="italic   text-[#ffb012]">you.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light italic border-l-2 border-[#ffb012]/20 pl-6">
              If this sounds like your company, we want to hear from you. Professional operators for
              the physical world.
            </p>
          </div>
        </div>

        {/* Compact Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {lookFor.map((w, i) => (
            <article
              key={w.t}
              className="group bg-white border border-neutral-100 p-5 rounded-4xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl text-amber-600 transition-all duration-500 group-hover:bg-[#ffb012] group-hover:text-white">
                {w.ico}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 leading-tight transition-colors group-hover:text-[#ffb012]">
                {w.t}
              </h3>
              <div className=" h-px w-6 bg-neutral-100 group-hover:w-12 group-hover:bg-[#ffb012]/50 transition-all duration-500" />
              <p className="mt-4 text-base  text-neutral-600 leading-relaxed font-light">{w.b}</p>
            </article>
          ))}
        </div>

        {/* Integrated CTA Footer */}
        <div className="mt-8 py-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffb012] font-bold">
              Ready to build?
            </span>
            {/* <p className="text-xs text-neutral-600 font-mono uppercase tracking-widest font-bold">
              Current Cycle: OPEN / Q2-2024
            </p> */}
          </div>

          <a
            href="/pitch"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#ffb012] text-black font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-lg shadow-[#ffb012]/10 w-full md:w-auto text-center"
          >
            Submit your pitch <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
