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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-amber-400 mb-6 font-bold">
              The Partnership
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Builders. Investors. <br />
              <span className=" italic text-amber-400">Battle-Tested</span>
            </h2>
          </div>
          <AnimatedLink href="/team">All Partners & Advisors</AnimatedLink>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
          {displayTeam.map((m) => (
            <article
              key={m.name}
              className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-start group"
            >
              <div className="relative h-40 w-40 md:h-48 md:w-48 shrink-0 overflow-hidden bg-neutral-50 rounded-2xl transition-all duration-500 shadow-sm border border-neutral-100">
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

              <div className="flex-1 text-center sm:text-left py-1">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2 font-bold">
                  {m.role}
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3 tracking-tight">
                  {m.name}
                </h3>
                <p className="text-sm text-neutral-800 leading-relaxed font-light mb-4 line-clamp-3">
                  {m.bio}
                </p>
                <a
                  href={m.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Connect <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
