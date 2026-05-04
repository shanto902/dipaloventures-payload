import React from 'react'
import { heroStats } from '@/lib/demo'

const HERO_CITY_IMG = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80'

export function TeamHero() {
  return (
    <section className="relative  px-5 md:px-12 py-12 pt-24 overflow-hidden">
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
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
                The Partnership
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
              Operators who <br />
              actually <span className="italic text-amber-400  ">ship.</span>
            </h1>
          </div>
          <div className="max-w-sm">
            <p className="text-lg text-neutral-500 leading-relaxed font-normal italic border-l-2 border-amber-400/20 pl-6">
              We are founders and engineers who have actually shipped physical products at scale.
              Dozens of early-stage investments, anchored by deep technical rigour.
            </p>
          </div>
        </div>

        {/* Story Artifact Slot */}
        <div className="mt-16 md:mt-24 grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="relative group">
            {/* Architectural Frame */}
            <div className="absolute -inset-4 border border-amber-400/20 rounded-[2.5rem] -rotate-1 transition-transform duration-700 group-hover:rotate-0" />
            <div className="relative aspect-16/10 overflow-hidden rounded-4xl bg-neutral-900 shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${HERO_CITY_IMG}')` }}
                aria-label="Chicago skyline at dusk"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Technical Metadata Overlay */}
              <div className="absolute bottom-8 left-8 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">
                    Base Operations
                  </span>
                  <span className="font-mono text-xs text-white font-bold">CHICAGO, IL</span>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">
                    Coordinates
                  </span>
                  <span className="font-mono text-xs text-white font-bold">
                    41.8781° N, 87.6298° W
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Staggered Insights & Etymology */}
          <div className="space-y-12 ">
            <div className="space-y-6">
              <p className="text-lg text-neutral-600 leading-relaxed font-light italic">
                A level of product development and manufacturing experience generally not found in
                venture capital. From Motorola to med-tech, we&apos;ve built physical products at
                scale.
              </p>
              <p className="text-base text-neutral-500 leading-relaxed font-light">
                Our GPs come from the design and engineering teams at Motorola and Google — but they
                met later at Chicago startup Jiobit. Rafiq was one of the first investors; Mitul
                designed the PCB electronics. Both saw founders burning through investor cash
                without sufficient mentorship.
              </p>
            </div>

            {/* Etymology Technical Dossier */}
            <div className="bg-white border border-neutral-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="font-mono  text-xs uppercase tracking-[0.3em] text-amber-400 mb-6 font-bold flex items-center gap-2">
                <span>[ Archive: DI · PA · LO ]</span>
                <div className="h-px flex-1 bg-amber-400/10" />
              </div>
              <ol className="space-y-4">
                {[
                  <React.Fragment key="1">
                    Bangla, the modern South Asian language, is rooted in Sanskrit.
                  </React.Fragment>,
                  <React.Fragment key="2">
                    <span className="text-neutral-900 font-medium   italic text-lg">Pra-dip</span> —
                    meaning &quot;light, lantern&quot;
                  </React.Fragment>,
                  <React.Fragment key="3">
                    <span className="text-neutral-900 font-medium   italic text-lg">Alo</span> —
                    meaning &quot;light&quot;
                  </React.Fragment>,
                ].map((content, i) => (
                  <li key={i} className="flex gap-6 text-sm text-neutral-500 italic font-light">
                    <span className="font-mono text-amber-500 font-bold mt-1 text-xs">
                      0{i + 1}
                    </span>
                    <span>{content}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Integrated Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 border border-neutral-100 bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-neutral-900/5">
          {heroStats.map((s, i) => (
            <div
              key={s.l}
              className={`p-8 group transition-all duration-500 hover:bg-amber-50/30 ${
                i !== 0 ? 'border-l border-neutral-100' : ''
              } ${i >= 2 ? 'border-t md:border-t-0 border-neutral-100' : ''}`}
            >
              <div className="text-3xl lg:text-4xl   text-neutral-900 group-hover:text-amber-500 transition-colors">
                {s.n}
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mt-3 font-bold leading-tight">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
