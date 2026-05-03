import React from 'react'
import { advisors } from '@/lib/demo'

export function TeamAdvisors() {
  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="max-w-3xl mb-8">
        <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">
          Residency Advisors
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
          The expertise behind the Residency.
        </h2>
        <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
          Our Residency draws on a network of operators, engineers, and domain experts across hard
          tech, energy, and advanced manufacturing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {advisors.map((a) => {
          const initials = a.name
            .split(' ')
            .map((p) => p[0])
            .slice(0, 2)
            .join('')
          return (
            <article
              key={a.name}
              className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm hover:border-amber-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold border-[1.5px] border-neutral-200 shrink-0"
                  style={{
                    background: a.bg,
                    color: a.fg,
                  }}
                >
                  {initials}
                </div>
                <div className="min-w-0">
                  <div className="text-base font-semibold text-neutral-900 leading-tight">
                    {a.name}
                  </div>
                </div>
              </div>
              <div className="text-sm text-neutral-500 mt-2.5 font-medium">{a.title}</div>
              <div className="text-sm text-amber-600 font-bold uppercase tracking-wide">
                {a.org}
              </div>
              <a
                href={a.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-neutral-500 mt-2 inline-block hover:underline hover:text-amber-700 transition-colors font-medium"
              >
                LinkedIn ↗
              </a>
            </article>
          )
        })}
      </div>
      <p className="text-center mt-6 text-xs text-neutral-500 font-medium">
        + 10 more advisors across energy, manufacturing, and life sciences.
      </p>
    </section>
  )
}
