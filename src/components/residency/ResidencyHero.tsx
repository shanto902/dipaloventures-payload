import React from 'react'
import Image from 'next/image'
import vumoProduct from '@/assets/products/vumo-product.jpg'

export function ResidencyHero() {
  return (
    <section className="relative  px-5 md:px-12 pt-24 pb-20 overflow-hidden">
      {/* Technical Background Pattern */}
      <div className="absolute inset-0 bg-[#fcfbf9] -z-10" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4">
        {/* Architectural Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-neutral-200 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
                Technical Studio
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
              A technical diligence <br />
              + product development <br />
              <span className="italic text-amber-400  ">program.</span>
            </h1>
          </div>
          <div className="max-w-sm">
            <p className="text-lg text-neutral-500 leading-relaxed font-normal">
              The Dipalo Residency is how we de-risk hard tech. Engineering audits, supply chain
              mapping, and manufacturing support — applied before we invest.
            </p>
          </div>
        </div>

        {/* Feature Artifact Slot */}
        <div className="mt-16 md:mt-24 grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div className="relative group">
            {/* Architectural Frame */}
            <div className="absolute -inset-4 border border-amber-400/20 rounded-[2.5rem] -rotate-1 transition-transform duration-700 group-hover:rotate-0" />
            <div className="relative aspect-16/10 overflow-hidden rounded-[2rem] bg-neutral-900 shadow-2xl">
              <Image
                src={vumoProduct}
                alt="Residency at work"
                fill
                className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Technical Metadata Overlay */}
              <div className="absolute bottom-8 left-8 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">
                    Artifact ID
                  </span>
                  <span className="font-mono text-xs text-white font-bold">RES-VUMO-026</span>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">
                    Location
                  </span>
                  <span className="font-mono text-xs text-white font-bold">
                    Studio B / Shenzhen
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Staggered Insights */}
          <div className="space-y-10 lg:pt-12">
            <div className="relative pl-10 border-l border-neutral-200">
              <div className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-amber-400 -translate-x-1/2" />
              <figure>
                <blockquote className="  text-2xl md:text-3xl leading-snug text-neutral-900 italic">
                  "There's a tremendous amount of{' '}
                  <span className="text-amber-500">craftsmanship</span> in between a great idea and
                  a great product."
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <div className="h-px w-8 bg-neutral-300" />
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
                    Dipalo Philosophy
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className="bg-white border border-neutral-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500">
              <div className="flex items-center gap-3 mb-5">
                <div className="px-2 py-0.5 bg-amber-50 rounded text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">
                  The Result
                </div>
              </div>
              <p className="text-neutral-600 leading-relaxed font-light italic">
                Residency surfaces gaps in engineering, supply chain, and time-to-market before they
                become existential — so founders can solve them while there's still runway.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
