import React from 'react'
import Image from 'next/image'
import { AnimatedLink } from '@/components/ui/AnimatedLink'

function initial(n: string) {
  return n.trim()[0] ?? '·'
}

export function TeamSection({ members }: { members?: any[] }) {
  const displayTeam = members || []

  if (displayTeam.length === 0) return null

  return (
    <section className="bg-white px-5 md:px-12 py-8 border-t border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#ffb012] mb-6 font-bold">
              The Partnership
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Builders. Investors. <br />
              <span className=" italic text-[#ffb012]">Battle-Tested</span>
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-light mb-8 lg:text-left pl-6 border-l-2 border-[#ffb012]/20">
              From Motorola and Google to founding startups, product design agencies, angel groups,
              and venture funds our GPs are serial entrepreneurs who have both built and backed
              innovation for decades.
            </p>
            <div className="flex lg:justify-end">
              <AnimatedLink href="/team">All Partners & Advisors</AnimatedLink>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-6xl mx-auto">
          {displayTeam.map((m, i) => (
            <article
              key={m.name}
              className="flex flex-col sm:flex-row gap-8 items-center sm:items-center group"
            >
              {/* Technical Image Frame */}
              <div className="relative h-44 w-44 md:h-52 md:w-52 shrink-0">
                <div className="absolute inset-0 border border-neutral-200 rounded-2xl -m-2 group-hover:border-[#ffb012]/30 transition-all duration-500" />
                <div className="relative h-full w-full overflow-hidden bg-neutral-50 rounded-2xl transition-all duration-500 shadow-sm border border-neutral-100">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-5xl font-mono">
                      {initial(m.name)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left py-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="w-1 h-3 bg-[#ffb012]" />
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-800 font-bold">
                      {m.role}
                    </div>
                  </div>
                  <h3 className="text-3xl font-semibold text-neutral-900 tracking-tight mt-2">
                    {m.name}
                  </h3>
                </div>

                <div className="mt-6">
                  {m.linkedin && m.linkedin !== '#' ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-neutral-200 text-xs font-mono uppercase tracking-widest font-bold text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-500"
                    >
                      <span>Linkedin</span>
                      <span className="text-[#ffb012]">↗</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-neutral-100 text-xs font-mono uppercase tracking-widest font-bold text-neutral-400 cursor-default">
                      <span>Linkedin</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
