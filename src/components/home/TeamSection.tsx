import React from 'react'
import Image from 'next/image'
import { team } from '@/lib/demo'
import { AnimatedLink } from '@/components/ui/AnimatedLink'

function initial(n: string) {
  return n.trim()[0] ?? '·'
}

export function TeamSection({ members }: { members?: any[] }) {
  // We limit to the first 4 for the homepage layout
  const displayTeam = (members || team).slice(0, 5)

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-amber-400 mb-6 font-bold">
              The team
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Operators with <span className="italic text-amber-400">scars.</span>
            </h2>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-xl">
              From Motorola to med-tech — our GPs have built physical products at scale.
            </p>
          </div>
          <AnimatedLink href="/team">Meet the full team</AnimatedLink>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 md:gap-10">
          {displayTeam.map((m) => (
            <article key={m.name} className="group relative">
              <div className="relative aspect-square overflow-hidden bg-neutral-50 rounded-2xl mb-6">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    className="object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center   text-6xl text-neutral-200">
                    {initial(m.name)}
                  </div>
                )}
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="relative">
                <h3 className="  text-xl md:text-2xl text-neutral-900 font-medium tracking-tight">
                  {m.name}
                </h3>
                <p className="mt-1.5 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  {m.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
