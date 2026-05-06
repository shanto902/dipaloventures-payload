import React from 'react'
import { advisors } from '@/lib/demo'

export function TeamAdvisors({ advisors: liveAdvisors }: { advisors?: any[] }) {
  const displayAdvisors = liveAdvisors || advisors

  return (
    <section className="px-5 md:px-12">
      <main className="relative py-8 overflow-hidden bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4">
          {/* Architectural Header — Horizontal Split */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-neutral-100 pb-8 mb-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <div className=" text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                  Expertise Network
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
                The operators behind <br />
                the <span className="italic text-amber-400  ">Residency.</span>
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light italic border-l-2 border-amber-400/10 pl-6 mb-2">
                A network of operators, engineers, and domain experts across hard tech, energy, and
                advanced manufacturing.
              </p>
            </div>
          </div>

          {/* High-Density Network Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayAdvisors.map((a) => {
              const initials = a.name
                .split(' ')
                .map((p: string) => p[0])
                .slice(0, 2)
                .join('')

              const role = a.role || a.title
              const org = a.organization || a.org

              return (
                <article
                  key={a.name}
                  className="group relative bg-[#fcfbf9] border border-neutral-100 rounded-2xl p-5 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-4">
                    {/* Initials Artifact */}
                    <div className="relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center  text-xs font-mono font-bold border border-neutral-200 bg-white shadow-sm transition-colors duration-500 group-hover:border-amber-400 group-hover:text-amber-500">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-neutral-900 tracking-tight leading-tight group-hover:text-amber-500 transition-colors truncate">
                        {a.name}
                      </h4>
                      <div className="mt-1 font-mono uppercase text-xs tracking-[0.2em] text-neutral-600 font-bold truncate">
                        {org}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-100/50 flex flex-col gap-2">
                    <div className="text-xs text-neutral-500 leading-relaxed font-light italic truncate">
                      {role}
                    </div>
                    <a
                      href={a.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-amber-400 transition-colors flex items-center gap-2 group/link font-bold"
                    >
                      <span>LinkedIn Profile</span>
                      <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">
                        →
                      </span>
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-12 flex flex-col items-center">
            <p className=" text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
              + 10 more advisors across energy, manufacturing, and life sciences.
            </p>
          </div>
        </div>
      </main>
    </section>
  )
}
