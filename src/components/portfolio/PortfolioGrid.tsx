import React from 'react'
import { portfolio, fundMeta, sectorMeta, stageMeta } from '@/lib/demo'
import { Monogram } from '@/components/Monogram'

interface Props {
  filtered: typeof portfolio
  totalCount: number
}

export function PortfolioGrid({ filtered, totalCount }: Props) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-5 px-1">
        <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-medium">
          <span className="font-bold text-neutral-900">{filtered.length}</span> of{' '}
          <span className="font-bold text-neutral-900">{totalCount}</span> companies
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
        {filtered.map((p) => {
          const Card = (
            <>
              {p.productImage && (
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url(${p.productImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <div
                aria-hidden
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${p.productImage ? 'bg-neutral-900/70' : 'bg-neutral-900'}`}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-14 w-[168px] flex items-center shrink-0 group-hover:bg-white/95 group-hover:rounded-md group-hover:px-2 transition-all">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={`${p.name} logo`}
                      width={480}
                      height={160}
                      className="h-full w-full object-contain object-left"
                    />
                  ) : (
                    <Monogram name={p.name} />
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {p.fundKeys.map((fk) => (
                    <span
                      key={fk}
                      className={`inline-block text-xs font-mono tracking-widest uppercase px-2.5 py-1 rounded-full ${fundMeta[fk].tone} group-hover:bg-white/20 group-hover:text-white transition-colors`}
                    >
                      {fundMeta[fk].label}
                    </span>
                  ))}
                  {p.exit && (
                    <span className="inline-block text-xs font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-amber-500 text-white font-medium">
                      ★ {p.exit}
                    </span>
                  )}
                </div>
                <h2 className="font-serif text-2xl mt-4 font-medium transition-colors group-hover:text-white text-neutral-900">
                  {p.name}
                  {p.url && <span className="ml-1.5 text-base align-middle">↗</span>}
                </h2>
                <p className="mt-3 text-sm leading-relaxed flex-1 text-neutral-600 group-hover:text-white/85 transition-colors">
                  {p.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-neutral-200 group-hover:border-white/20 flex items-center justify-between transition-colors">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-600 group-hover:text-white/90 transition-colors font-medium">
                    {sectorMeta[p.sector]?.label}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 group-hover:text-white/70 transition-colors font-medium">
                    {stageMeta[p.stage]?.label}
                  </span>
                </div>
              </div>
            </>
          )

          const className =
            'group relative overflow-hidden bg-white p-6 transition-colors flex flex-col min-h-[300px] hover:z-10 focus-within:z-10'

          return p.url ? (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {Card}
            </a>
          ) : (
            <article key={p.name} className={className}>
              {Card}
            </article>
          )
        })}

        {filtered.length === 0 && (
          <div className="bg-white p-12 text-center text-neutral-500 sm:col-span-2 xl:col-span-3 min-h-[300px] flex items-center justify-center">
            No companies match these filters.
          </div>
        )}

        {filtered.length > 0 &&
          (() => {
            const smGap = (2 - (filtered.length % 2)) % 2
            const xlGap = (3 - (filtered.length % 3)) % 3
            const fillers = Math.max(smGap, xlGap)
            return Array.from({ length: fillers }).map((_, i) => {
              const showSm = i < smGap
              const showXl = i < xlGap
              let cls = 'bg-white min-h-[300px] hidden'
              if (showSm && showXl) cls += ' sm:block'
              else if (showSm && !showXl) cls += ' sm:block xl:hidden'
              else if (!showSm && showXl) cls += ' xl:block'
              return <div key={`filler-${i}`} aria-hidden className={cls} />
            })
          })()}
      </div>
    </div>
  )
}
