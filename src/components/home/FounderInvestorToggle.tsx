'use client'

import React, { useState, useRef, KeyboardEvent, useId } from 'react'
import { tabContent } from '@/lib/demo'

type TabKey = 'founders' | 'investors'

export function FounderInvestorToggle() {
  const [tab, setTab] = useState<TabKey>('founders')
  const data = tabContent[tab]
  const tabs: TabKey[] = ['founders', 'investors']
  const baseId = useId()
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    founders: null,
    investors: null,
  })

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = tabs.indexOf(tab)
    let nextIndex: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIndex = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      nextIndex = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') nextIndex = 0
    else if (e.key === 'End') nextIndex = tabs.length - 1

    if (nextIndex !== null) {
      e.preventDefault()
      const next = tabs[nextIndex]
      setTab(next)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <section
      className="bg-[#fcfbf9] py-16 md:py-24 px-6 md:px-12"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="container mx-auto px-4">
        <h2 id={`${baseId}-heading`} className="sr-only">
          For founders and investors
        </h2>

        {/* Premium Pill Toggle */}
        <div className="flex justify-center mb-20">
          <div
            role="tablist"
            aria-label="Audience"
            className="relative p-1 bg-neutral-200/50 rounded-full flex w-full max-w-[330px]"
          >
            {/* Sliding Background */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out z-0 ${tab === 'investors' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'}`}
            />
            {tabs.map((k) => {
              const active = tab === k
              const label = k === 'founders' ? 'For Founders' : 'For Investors'
              return (
                <button
                  key={k}
                  ref={(el) => {
                    tabRefs.current[k] = el
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${k}`}
                  aria-selected={active}
                  aria-controls={`${baseId}-panel-${k}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(k)}
                  onKeyDown={onTabKeyDown}
                  className={`
                    relative z-10 flex-1 text-xs tracking-[0.25em] uppercase font-mono font-bold py-3 px-4 rounded-full transition-colors duration-300
                    focus-visible:outline-none 
                    ${active ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}
                  `}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-${tab}`}
          aria-labelledby={`${baseId}-tab-${tab}`}
          tabIndex={0}
          key={tab}
          className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="lg:sticky lg:top-32">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-amber-400 mb-6 font-bold">
              {tab === 'founders' ? 'The Founder Value' : 'The Investor Access'}
            </div>
            <h3 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              {data.headline.replace('.', '')} <span className="italic"></span>
            </h3>
            <p className="mt-6 md:mt-8 text-lg md:text-xl text-neutral-600 leading-relaxed font-light max-w-xl">
              {data.body}
            </p>
          </div>

          <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 md:p-12 shadow-sm">
            <ul className="space-y-10 md:space-y-12">
              {data.bullets.map((bl, i) => (
                <li key={bl.t} className="group">
                  <div className="flex gap-4 md:gap-6">
                    <div className="text-amber-400 font-mono text-xs font-bold mt-1.5 shrink-0">
                      0{i + 1}
                    </div>
                    <div>
                      <div className="text-lg md:text-xl font-semibold text-neutral-900 group-hover:text-amber-400 transition-colors">
                        {bl.t}
                      </div>
                      <div className="text-base text-neutral-600 mt-2 md:mt-3 leading-relaxed font-light">
                        {bl.b}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
