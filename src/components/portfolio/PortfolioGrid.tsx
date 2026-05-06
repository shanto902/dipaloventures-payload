import React from 'react'
import {
  portfolio,
  fundMeta,
  sectorMeta,
  stageMeta,
  type Sector,
  type Stage,
  type FundKey,
} from '@/lib/demo'
import { Monogram } from '@/components/Monogram'
import { ArrowUpRight } from 'lucide-react'

interface Props {
  filtered: any[]
  totalCount: number
}

export function PortfolioGrid({ filtered, totalCount }: Props) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6 px-1">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-600 font-bold">
          <span className="text-neutral-900">{filtered.length}</span> / {totalCount} Entities
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
        {filtered.map((p) => {
          const CardContent = (
            <>
              {/* Exit Corner Fill */}
              {p.isExited && (
                <div 
                  className="absolute top-0 right-0 w-24 h-24 bg-green-600 z-20 pointer-events-none"
                  style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                >
                  <span className="absolute top-7 right-2 text-white text-base font-mono font-bold uppercase tracking-widest rotate-[45deg]">
                    Exit
                  </span>
                </div>
              )}

              {/* Cinematic Product Image Hover */}
              {p.productImage && (
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100 ease-out"
                  style={{
                    backgroundImage: `url(${p.productImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}

              {/* Sophisticated Dark Overlay */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-neutral-900/80 group-hover:bg-linear-to-t group-hover:from-neutral-900/30 group-hover:via-neutral-900/20 group-hover:to-neutral-900/10"
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Brand Identity Slot */}
                <div className="h-10 w-fit flex items-center shrink-0 mb-6 transition-all duration-500 group-hover:translate-y-[-2px]">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={`${p.name} logo`}
                      className="h-full w-[120px] object-contain object-left transition-all duration-500 group-hover:brightness-0 group-hover:invert"
                    />
                  ) : (
                    <Monogram name={p.name} className="group-hover:text-white transition-colors" />
                  )}
                </div>

                {/* Metadata Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {p.fundKeys.map((fk: FundKey) => (
                    <span
                      key={fk}
                      className="text-xs font-mono tracking-[0.15em] uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 group-hover:bg-white/10 group-hover:text-amber-400 transition-all duration-300 font-bold"
                    >
                      {fundMeta[fk].label}
                    </span>
                  ))}
                  {p.exit && (
                    <span className="text-xs font-mono tracking-[0.15em] uppercase px-2 py-0.5 rounded-full bg-amber-400 text-neutral-900 font-bold">
                      ★ {p.exit}
                    </span>
                  )}
                </div>

                {/* Typography Block */}
                <h2 className="  text-2xl font-medium transition-colors duration-300 group-hover:text-white text-neutral-900 leading-tight">
                  {p.name}
                  {p.url && (
                    <span className="inline-flex items-center gap-1 ml-2.5 px-2 py-0.5 rounded-full bg-neutral-100 text-[9px] font-mono font-bold tracking-[0.15em] text-neutral-500 opacity-50 group-hover:opacity-100 group-hover:bg-amber-400 group-hover:text-neutral-900 transition-all duration-500 align-middle">
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>
                  )}
                </h2>
                <p className="mt-3 text-base leading-relaxed flex-1 text-neutral-700 group-hover:text-white/70 transition-colors duration-300 font-normal">
                  {p.desc}
                </p>

                {/* Technical Footnote */}
                <div className="mt-6 pt-4 border-t border-neutral-100 group-hover:border-white/10 flex items-center justify-between transition-colors">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-amber-400 font-bold">
                    {sectorMeta[p.sector as Sector]?.label}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-600 group-hover:text-white/40 transition-colors font-bold">
                    {stageMeta[p.stage as Stage]?.label}
                  </span>
                </div>
              </div>
            </>
          )

          const cardBaseClass =
            'group relative overflow-hidden bg-white p-7 md:p-8 transition-all duration-500 flex flex-col min-h-[340px] hover:z-10'

          return p.url ? (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cardBaseClass}
            >
              {CardContent}
            </a>
          ) : (
            <article key={p.name} className={cardBaseClass}>
              {CardContent}
            </article>
          )
        })}

        {/* Grid Fillers for Consistent Border Borders */}
        {filtered.length > 0 &&
          (() => {
            const smGap = (2 - (filtered.length % 2)) % 2
            const xlGap = (3 - (filtered.length % 3)) % 3
            const fillers = Math.max(smGap, xlGap)
            return Array.from({ length: fillers }).map((_, i) => (
              <div key={`filler-${i}`} aria-hidden className="bg-white hidden sm:block" />
            ))
          })()}

        {filtered.length === 0 && (
          <div className="bg-white sm:col-span-2 xl:col-span-3 min-h-[400px] flex flex-col items-center justify-center p-12 text-center text-neutral-600">
            <span className="text-4xl mb-4   italic text-neutral-400">No results</span>
            <p className="font-mono text-xs uppercase tracking-widest font-bold">
              Adjust filters to see more entities
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
