import React from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolio } from "@/lib/demo";

export function PortfolioMarquee() {
  const items = [...portfolio, ...portfolio];
  
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden border-y border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-amber-600 font-semibold mb-3">
              Selected portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
              16 companies reshaping<br />their <span className="italic">categories.</span>
            </h2>
          </div>
          <Link href="/portfolio" className="text-sm text-amber-600 hover:opacity-80 underline underline-offset-4">
            See full portfolio →
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
        {/* Note: the true marquee effect needs CSS animations which can be added later in styles.css if needed */}
        <div className="flex gap-4 md:gap-6 py-4 px-4 min-w-max">
          {items.map((p, i) => (
            <a
              key={`${p.name}-${i}`}
              href={p.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 h-20 md:h-24 w-[240px] md:w-[280px] rounded-xl border border-neutral-200 bg-white hover:border-amber-500 hover:shadow-sm transition-all flex items-center justify-center overflow-hidden snap-start"
              title={p.name}
            >
              {p.logo ? (
                <Image
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={240}
                  height={96}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="font-serif text-xl md:text-2xl text-neutral-900 tracking-tight">
                  {p.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
