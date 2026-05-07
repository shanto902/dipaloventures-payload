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

      <main className="px-6 md:px-12 pb-8">
        <div className="container mx-auto px-4">
          <PortfolioStats />

          <div className="mt-8 grid lg:grid-cols-[260px_1fr] gap-10">
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
        </div>
      </main>
    </>
  )
}
