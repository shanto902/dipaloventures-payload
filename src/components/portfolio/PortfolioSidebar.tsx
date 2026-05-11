import React from 'react'
import {
  portfolio,
  fundMeta,
  sectorMeta,
  stageMeta,
  type FundKey,
  type Sector,
  type Stage,
} from '@/lib/demo'

interface Props {
  funds: Set<FundKey>
  setFunds: (funds: Set<FundKey>) => void
  sectors: Set<Sector>
  setSectors: (sectors: Set<Sector>) => void
  stages: Set<Stage>
  setStages: (stages: Set<Stage>) => void
  reset: () => void
  totalActive: number
  allItems: any[]
}

export function PortfolioSidebar({
  funds,
  setFunds,
  sectors,
  setSectors,
  stages,
  setStages,
  reset,
  totalActive,
  allItems,
}: Props) {
  function toggle<T>(set: Set<T>, value: T, setter: (s: Set<T>) => void) {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    setter(next)
  }

  return (
    <aside className="lg:sticky lg:top-8 self-start">
      <div className="bg-white border rounded-2xl border-neutral-200  p-6 ">
        <div className="flex items-center justify-between mb-5">
          <div className="font-mono text-base uppercase tracking-widest text-[#ffb012] font-semibold">
            Filters
          </div>
          {totalActive > 0 && (
            <button
              onClick={reset}
              className="text-xs text-neutral-600 hover:text-[#ffb012] underline underline-offset-2 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        <FilterGroup label="Funds">
          {(Object.keys(fundMeta) as FundKey[]).map((k) => (
            <FilterCheckbox
              key={k}
              checked={funds.has(k)}
              onChange={() => toggle(funds, k, setFunds)}
              label={fundMeta[k].label}
              count={allItems.filter((p) => p.fundKeys.includes(k)).length}
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Sectors">
          {(Object.keys(sectorMeta) as Sector[]).map((s) => (
            <FilterCheckbox
              key={s}
              checked={sectors.has(s)}
              onChange={() => toggle(sectors, s, setSectors)}
              label={sectorMeta[s].label}
              count={allItems.filter((p) => p.sector === s).length}
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Initial Stages" last>
          {(Object.keys(stageMeta) as Stage[]).map((s) => (
            <FilterCheckbox
              key={s}
              checked={stages.has(s)}
              onChange={() => toggle(stages, s, setStages)}
              label={stageMeta[s].label}
              count={allItems.filter((p) => p.stage === s).length}
            />
          ))}
        </FilterGroup>
      </div>
    </aside>
  )
}

function FilterGroup({
  label,
  children,
  last,
}: {
  label: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div className={last ? '' : 'mb-5 pb-5 border-b border-neutral-200'}>
      <div className="font-mono text-xs uppercase tracking-widest text-neutral-600 mb-3 font-semibold">
        {label}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function FilterCheckbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean
  onChange: () => void
  label: string
  count: number
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer py-1 group text-xs uppercase tracking-wider font-medium">
      <span className="flex items-center gap-3 min-w-0">
        <span
          className={`h-4 w-4 rounded-[3px] border transition shrink-0 flex items-center justify-center ${
            checked
              ? 'bg-[#ffb012] border-[#ffb012]'
              : 'border-neutral-300 group-hover:border-[#ffb012] bg-white'
          }`}
        >
          {checked && <span className="text-white text-xs leading-none">✓</span>}
        </span>
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <span
          className={`truncate transition-colors ${checked ? 'text-neutral-900' : 'text-neutral-800 group-hover:text-neutral-900'}`}
        >
          {label}
        </span>
      </span>
      <span className="font-mono text-neutral-600 shrink-0 font-bold text-xs">{count}</span>
    </label>
  )
}
