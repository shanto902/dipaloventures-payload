import React from 'react'

export function MediaHero() {
  return (
    <header className="relative  px-5 md:px-12 pt-24 pb-16 overflow-hidden">
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
        {/* Architectural Header — Horizontal Split */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-neutral-200 pb-12 md:pb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className=" text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
                Technical Studio · Media
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
              Stories from the <br />
              <span className="italic text-amber-400  ">hard side.</span>
            </h1>
          </div>

          <div className="max-w-sm">
            <p className="text-lg text-neutral-500 leading-relaxed font-light italic border-l-2 border-amber-400/10 pl-6 mb-2">
              Documenting the journey of physical product development, from early engineering
              prototypes to global manufacturing.
            </p>
          </div>
        </div>

        {/* Technical Navigation / Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span className="font-mono  text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mr-4">
            Filter Archive:
          </span>
          {[
            { id: 'video', label: 'Video Content' },
            { id: 'instagram', label: 'Social Feed' },
            { id: 'blog', label: 'Editorial' },
          ].map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="px-6 py-2 bg-white border border-neutral-100 rounded-full font-mono  text-xs uppercase tracking-[0.15em] text-neutral-400 hover:border-amber-400 hover:text-amber-500 hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-500 font-bold"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
