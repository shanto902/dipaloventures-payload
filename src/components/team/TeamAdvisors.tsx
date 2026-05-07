'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'
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
    const role = a.role || a.title
    const org = a.organization || a.org

    return (
      <article className="group relative bg-white border border-neutral-100 rounded-2xl p-4 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-0.5 h-full flex flex-col justify-between">
        <div className="flex items-center gap-4 mb-4">
          {/* Portrait Artifact */}
          <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 shadow-sm transition-colors duration-500 group-hover:border-[#ffb012]">
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

          <div className="min-w-0">
            <h4 className="text-base font-semibold text-neutral-900 tracking-tight leading-tight group-hover:text-[#ffb012] transition-colors truncate">
              {a.name}
            </h4>
            <div className="mt-1 font-mono uppercase text-xs tracking-[0.15em] text-neutral-600 font-bold truncate">
              {org}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-50 flex items-center justify-between gap-2">
          <div className="text-xs text-neutral-400 font-light italic truncate">{role}</div>

          {a.linkedin && (
            <a
              href={a.linkedin}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-[#ffb012] transition-colors font-bold"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </article>
    )
  }

  return (
    <section className="px-5 md:px-12 mb-20">
      <main className="relative py-12 overflow-hidden bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-neutral-100 pb-8 mb-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffb012] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                  Expertise Network
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
                The operators behind the <span className="italic text-[#ffb012]">Residency.</span>
              </h2>
            </div>
          </div>

          {/* Optimized Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayAdvisors.map((a, idx) => (
              <AdvisorCard key={`${idx}-${a.name}`} a={a} />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
              + 10 more advisors across energy, manufacturing, and life sciences.
            </p>
          </div>
        </div>
      </main>
    </section>
  )
}
