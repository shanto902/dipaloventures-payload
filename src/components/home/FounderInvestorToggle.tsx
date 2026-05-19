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

  const otherTab = tab === 'founders' ? 'investors' : 'founders'

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
    <section className="bg-white py-8 px-6 md:px-12 relative">
      <div className="container mx-auto px-4">
        {/* Refined Tab Toggle */}
        <div className="flex justify-center mb-8 ">
          <div
            role="tablist"
            aria-label="Audience"
            className="relative p-1 bg-neutral-50 rounded-full flex w-full max-w-[400px] border border-neutral-200 shadow-inner"
          >
            {/* Sliding Indicator */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#ffb012] rounded-full shadow-sm transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-0 ${
                tab === 'investors' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'
              }`}
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
                    relative z-10 flex-1 text-sm tracking-[0.2em] uppercase font-mono font-bold py-3 px-6 rounded-full transition-all duration-300
                    focus-visible:outline-none 
                    ${active ? 'text-black' : 'text-neutral-600 hover:text-neutral-600'}
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
          className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <div className="lg:sticky lg:top-32">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#ffb012] mb-6 font-bold">
              {tab === 'founders' ? 'Why Partner With Us' : 'Why Partner With Us'}
            </div>
            <h3 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              {data.headline} <span className="italic"></span>
            </h3>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-800 leading-relaxed font-light max-w-xl">
              {data.body}
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-[#fcfbf9] border border-neutral-200/60 rounded-3xl p-6 md:p-12 shadow-sm">
              <ul className="space-y-10 md:space-y-12">
                {data.bullets.map((bl, i) => (
                  <li key={bl.t} className="group">
                    <div className="flex gap-4 md:gap-6">
                      <div>
                        <div className="text-lg md:text-xl font-semibold text-neutral-900 group-hover:text-[#ffb012] transition-colors">
                          {bl.t}
                        </div>
                        <div className="text-base md:text-lg text-neutral-800 mt-2 md:mt-3 leading-relaxed font-light">
                          {bl.b}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Path Switcher CTA */}
            {/* <div className="lg:hidden p-8 rounded-3xl bg-[#ffb012]/5 border border-[#ffb012]/10">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2 font-bold">
                Switch Path
              </div>
              <div className="text-sm text-neutral-600 mb-4 font-light">
                Are you an {otherTab === 'investors' ? 'investor' : 'founder'}?
              </div>
              <button
                onClick={() => setTab(otherTab)}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-900"
              >
                See Investor View →
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
