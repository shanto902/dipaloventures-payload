import React from 'react'

export function HomeMission() {
  return (
    <section className=" py-20 md:py-32 border-y border-neutral-200/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-amber-400 mb-6 font-bold">
              The Mission
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Backing the builders of the{' '}
              <span className="italic text-amber-400">physical world.</span>
            </h2>
            <div className="mt-10 h-px w-20 bg-amber-400/30" />
          </div>

          <div className="space-y-8 text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
            <p className="font-medium text-neutral-900">
              We are at a historic inflection point. Product innovation, global manufacturing, and
              supply chains must be reimagined to solve critical challenges for people and the
              planet. Software alone cannot solve these challenges.
            </p>
            <p>
              As founders set out to bring these innovations from the research lab and prototypes to
              market commercialization, it’s important to have investors who understand their
              technology and can provide more than financial investment.
            </p>
            <p className="italic text-neutral-900 font-normal border-l-2 border-amber-400 pl-6 py-2">
              At Dipalo Ventures, our Partners are founders and operators who know how to bridge
              this divide. Join us.
            </p>
            <div className="pt-4">
              <div className="font-serif text-2xl italic text-neutral-900">
                The Dipalo Partnership
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-2">
                Chicago & Global
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
