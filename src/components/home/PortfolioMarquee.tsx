import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { portfolio } from '@/lib/demo'

export function PortfolioMarquee({ items }: { items?: any[] }) {
  const displayItems = items || portfolio

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden border-y border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-600 font-bold mb-4">
              Selected portfolio
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1]">
              Companies reshaping
              <br />
              their <span className="italic">categories.</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-amber-600 transition-colors border-b border-neutral-200 pb-1"
          >
            Full Portfolio →
          </Link>
        </div>
      </div>

      <div className="relative mt-4">
        {/* Gradient overlays for smooth fading at edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-4">
          {displayItems.map((item) => (
            <div key={item.name} className="mx-12 flex items-center group">
              <div className="relative h-12 w-32 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <Image src={item.logo} alt={item.name} fill className="object-contain" />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
