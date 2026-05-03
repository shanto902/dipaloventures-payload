'use client'

import React, { useMemo, useState } from 'react'
import { portfolio, type FundKey, type Sector, type Stage } from '@/lib/demo'

import { PortfolioVideoBanner } from './PortfolioVideoBanner'
import { PortfolioStats } from './PortfolioStats'
import { PortfolioSidebar } from './PortfolioSidebar'
import { PortfolioGrid } from './PortfolioGrid'

export function PortfolioPageClient({ items }: { items?: any[] }) {
  const displayItems = items || []
  const [funds, setFunds] = useState<Set<FundKey>>(new Set())
  const [sectors, setSectors] = useState<Set<Sector>>(new Set())
  const [stages, setStages] = useState<Set<Stage>>(new Set())

  const filtered = useMemo(() => {
    return displayItems.filter((p) => {
      if (funds.size && !p.fundKeys.some((fk: FundKey) => funds.has(fk))) return false
      if (sectors.size && !sectors.has(p.sector)) return false
      if (stages.size && !stages.has(p.stage)) return false
      return true
    })
  }, [displayItems, funds, sectors, stages])

  function reset() {
    setFunds(new Set())
    setSectors(new Set())
    setStages(new Set())
  }

  const totalActive = funds.size + sectors.size + stages.size

  return (
    <>
      <PortfolioVideoBanner />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-4">
            Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 whitespace-nowrap">
            Our portfolio <span className="italic">companies.</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
            Breakthrough Technologies for People And The Planet.{' '}
            <span className="font-bold text-neutral-900">16</span> companies across Fund I, Fund II,
            and SPVs.
          </p>
        </div>

        <PortfolioStats />

        <div className="mt-16 grid lg:grid-cols-[260px_1fr] gap-10">
          <PortfolioSidebar
            funds={funds}
            setFunds={setFunds}
            sectors={sectors}
            setSectors={setSectors}
            stages={stages}
            setStages={setStages}
            reset={reset}
            totalActive={totalActive}
            allItems={displayItems}
          />
          <PortfolioGrid filtered={filtered} totalCount={displayItems.length} />
        </div>
      </section>
    </>
  )
}
