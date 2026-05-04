import React from 'react'
import Link from 'next/link'
import { lookFor } from '@/lib/demo'
import { Button } from '@/components/ui/Button'

export function ResidencyForFounders() {
  return (
    <section className="relative py-24 px-5 md:px-12 md:py-32 overflow-hidden">
      {/* Background Studio Tint */}
      <div className="absolute inset-0 bg-[#fcfbf9] border-t border-neutral-100 -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
                Founder Partnership
              </div>
            </div>
            <h2 className="text-4xl md:text-7xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              We&apos;re looking for <br />
              <span className="italic   text-amber-400">you.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-lg text-neutral-500 leading-relaxed font-light italic border-l-2 border-amber-400/20 pl-6">
              If this sounds like your company, we want to hear from you. Professional operators for
              the physical world.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lookFor.map((w, i) => (
            <article
              key={w.t}
              className={`group bg-white border border-neutral-100 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 flex flex-col ${
                i % 2 === 1 ? 'md:translate-y-8' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-2xl group-hover:bg-amber-400 transition-all duration-500 group-hover:scale-110">
                {w.ico}
              </div>
              <h3 className="mt-8   text-xl md:text-2xl font-medium text-neutral-900 leading-tight transition-colors group-hover:text-amber-500">
                {w.t}
              </h3>
              <div className="mt-4 h-px w-8 bg-neutral-100 group-hover:w-full group-hover:bg-amber-400/20 transition-all duration-700" />
              <p className="mt-6 text-sm text-neutral-500 leading-relaxed font-light group-hover:text-neutral-600">
                {w.b}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-24 md:mt-32 flex flex-col items-center justify-center text-center">
          <div className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold">
            Ready to build?
          </div>
          <Button href="/contact" label="Submit your pitch" variant="primary" />
        </div>
      </div>
    </section>
  )
}
