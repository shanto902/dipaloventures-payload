import React from 'react'

export const TeamHeroHeader = () => (
  <div className="flex  flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-neutral-200 pb-8">
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
          The Partnership
        </div>
      </div>
      <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
        Operators who <br />
        actually <span className="italic text-amber-400  ">ship.</span>
      </h1>
    </div>
    <div className="max-w-sm">
      <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light italic border-l-2 border-amber-400/20 pl-6">
        We are founders and engineers who have actually shipped physical products at scale. Dozens
        of early-stage investments, anchored by deep technical rigour.
      </p>
    </div>
  </div>
)
