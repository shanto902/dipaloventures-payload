"use client";

import React, { useState, useRef, KeyboardEvent, useId } from "react";
import { tabContent } from "@/lib/demo";

type TabKey = "founders" | "investors";

export function FounderInvestorToggle() {
  const [tab, setTab] = useState<TabKey>("founders");
  const data = tabContent[tab];
  const tabs: TabKey[] = ["founders", "investors"];
  const baseId = useId();
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    founders: null,
    investors: null,
  });

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = tabs.indexOf(tab);
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") nextIndex = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") nextIndex = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = tabs.length - 1;
    
    if (nextIndex !== null) {
      e.preventDefault();
      const next = tabs[nextIndex];
      setTab(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 md:py-24" aria-labelledby={`${baseId}-heading`}>
      <h2 id={`${baseId}-heading`} className="sr-only">
        For founders and investors
      </h2>
      <div role="tablist" aria-label="Audience" className="flex gap-2 mb-10">
        {tabs.map((k) => {
          const active = tab === k;
          const label = k === "founders" ? "For Founders" : "For Investors";
          return (
            <button
              key={k}
              ref={(el) => {
                tabRefs.current[k] = el;
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
                text-xs tracking-widest uppercase font-mono font-medium px-4 py-2 rounded-full transition-colors cursor-pointer
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
                ${active ? "bg-neutral-900 text-white border border-neutral-900" : "bg-transparent text-neutral-500 border border-neutral-300"}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${tab}`}
        aria-labelledby={`${baseId}-tab-${tab}`}
        tabIndex={0}
        className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start focus-visible:outline-none"
      >
        <div>
          <div className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wider">
            {tab === "founders" ? "For founders" : "For investors"}
          </div>
          <h3 className="text-3xl md:text-4xl font-semibold text-neutral-900">{data.headline}</h3>
          <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
            {data.body}
          </p>
        </div>
        <ul className="flex flex-col">
          {data.bullets.map((bl, i) => (
            <li
              key={bl.t}
              className={`py-5 border-b border-neutral-200 ${i === 0 ? "border-t" : ""}`}
            >
              <div className="text-base font-semibold text-neutral-900">{bl.t}</div>
              <div className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {bl.b}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
