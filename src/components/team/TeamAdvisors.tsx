'use client'

import { ArrowUpRight } from 'lucide-react'
import Marquee from 'react-fast-marquee'
import { advisors as demoAdvisors } from '@/lib/demo'
import { InitialsAvatar, PHOTO_FILTER } from './TeamHelpers'

interface Advisor {
  name: string
  role?: string
  title?: string
  organization?: string
  org?: string
  photo?: string
  linkedin?: string
}

export function TeamAdvisors({ advisors: liveAdvisors }: { advisors?: Advisor[] }) {
  const displayAdvisors = liveAdvisors || demoAdvisors

  const AdvisorCard = ({ a }: { a: Advisor }) => {
    const org = a.organization || a.org
    return (
      <article className="mx-4 group relative bg-white border border-neutral-100 rounded-2xl p-4 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900/5 min-w-[320px] flex items-center gap-4">
        <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 shadow-sm transition-colors duration-500 group-hover:border-[#ffb012]">
          {a.photo ? (
            <img
              src={a.photo}
              alt={a.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
              style={{ filter: PHOTO_FILTER }}
            />
          ) : (
            <InitialsAvatar name={a.name} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-base font-semibold text-neutral-900 tracking-tight leading-tight transition-colors truncate">
              {a.name}
            </h4>
            {a.linkedin && (
              <a
                href={a.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 hover:text-[#ffb012] transition-colors shrink-0"
              >
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
          <div className="mt-1 font-mono uppercase text-xs tracking-[0.15em] text-[#ffb012] font-bold truncate">
            {org}
          </div>
        </div>
      </article>
    )
  }

  // Split into two rows
  const midPoint = Math.ceil(displayAdvisors.length / 2)
  const row1 = displayAdvisors.slice(0, midPoint)
  const row2 = displayAdvisors.slice(midPoint)

  return (
    <section className="px-5 md:px-12 bg-[#fcfbf9]">
      <main className="relative overflow-hidden border-t border-neutral-100 py-16">
        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] font-bold">
                  Expertise Network
                </div>
              </div>
              <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light">
                A network of operators, engineers, and domain experts across hard tech, energy, and
                advanced manufacturing.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Row 1: Left to Right */}
          <Marquee gradient={false} speed={30} pauseOnHover={true} direction="left">
            {row1.map((a, idx) => (
              <AdvisorCard key={`r1-${idx}`} a={a} />
            ))}
          </Marquee>

          {/* Row 2: Right to Left */}
          <Marquee gradient={false} speed={25} pauseOnHover={true} direction="right">
            {row2.map((a, idx) => (
              <AdvisorCard key={`r2-${idx}`} a={a} />
            ))}
          </Marquee>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
            + 10 more advisors across energy, manufacturing, and life sciences.
          </p>
        </div>
      </main>
    </section>
  )
}
