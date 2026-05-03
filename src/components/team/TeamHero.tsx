import React from 'react'
import { heroStats } from '@/lib/demo'

const HERO_CITY_IMG = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80'

export function TeamHero() {
  return (
    <section className="flex flex-col mt-20 md:flex-row w-full min-h-[500px] border-b border-amber-400/30">
      {/* LEFT — city image */}
      <div
        className="w-full md:w-1/2 relative bg-cover bg-center bg-no-repeat min-h-[250px] md:min-h-[500px]"
        style={{ backgroundImage: `url('${HERO_CITY_IMG}')` }}
        aria-label="Chicago skyline at dusk"
      >
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">
            The Team
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/70 mt-1.5 font-bold">
            Chicago · Global
          </div>
        </div>
      </div>

      {/* RIGHT — content */}
      <div className="w-full md:w-1/2 bg-[#F5F0E8] p-6 md:p-10 lg:p-12 flex flex-col">
        <h1 className="sr-only">The Team — Dipalo Ventures</h1>

        {/* Eyebrow */}
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400 mb-6 font-bold">
          Operators Who Invest
        </div>

        {/* Body copy */}
        <div className="flex flex-col gap-4">
          {[
            'We are operators who invest — founders and operators who have actually shipped products. Dozens of early-stage investments across angel networks, VC funds, and now Dipalo Ventures.',
            "A level of product development and manufacturing experience generally not found in venture capital. From Motorola to med-tech, we've built physical products at scale.",
            'Our GPs come from the design and engineering teams at Motorola and Google — but they met later at Chicago startup Jiobit (exit to NASDAQ: LIF). Rafiq was one of the first investors; Mitul designed the PCB electronics. Both saw founders burning through investor cash without sufficient mentorship about the pitfalls of the hard tech journey. From that need, a new VC was born.',
          ].map((text, i) => (
            <p key={i} className="text-base md:text-base leading-relaxed text-[#5a5040] m-0">
              {text}
            </p>
          ))}
        </div>

        {/* Etymology card */}
        <div className="mt-6 bg-[#FFF8EE] border border-[#E8D9B8] rounded-xl px-5 py-4">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400 mb-3 font-bold">
            [ DI · PA · LO ]
          </div>
          <ol className="list-none m-0 p-0 flex flex-col gap-2">
            {[
              <React.Fragment key="1">
                Bangla, the modern South Asian language, is rooted in Sanskrit.
              </React.Fragment>,
              <React.Fragment key="2">
                <strong className="text-[#1a1a1a] font-medium">'Pra-dip'</strong> (Bangla),{' '}
                <strong className="text-[#1a1a1a] font-medium">'Pra-di-pa'</strong> (Sanskrit) —
                meaning "light, lantern"
              </React.Fragment>,
              <React.Fragment key="3">
                <strong className="text-[#1a1a1a] font-medium">'Alo'</strong> — meaning "light"
              </React.Fragment>,
            ].map((content, i) => (
              <li
                key={i}
                className="flex gap-3 italic text-sm md:text-base leading-relaxed text-[#5a5040]"
              >
                <span className="font-mono text-amber-400 font-medium shrink-0">{i + 1}.</span>
                <span>{content}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Stat strip — flush bottom, full bleed */}
        <div className="mt-10 md:mt-10 -ml-6 -mr-6 md:-ml-10 md:-mr-10 lg:-ml-12 lg:-mr-12 w-[calc(100%+48px)] md:w-[calc(100%+80px)] lg:w-[calc(100%+96px)] border-t border-[#d4c9b0] grid grid-cols-2 md:grid-cols-4">
          {heroStats.map((s, i) => (
            <div
              key={s.l}
              className={`p-5 md:p-6 border-[#d4c9b0] ${
                i % 2 !== 0 ? 'border-l' : ''
              } md:border-l ${i === 0 ? 'md:border-l-0' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''}`}
            >
              <div className="font-serif text-2xl lg:text-3xl text-[#1C1C1A] font-medium leading-none">
                {s.n}
              </div>
              <div className="font-mono text-xs md:text-xs uppercase tracking-[0.15em] text-[#8a7d65] mt-2.5 font-bold">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
