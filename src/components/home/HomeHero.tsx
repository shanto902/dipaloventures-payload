import React from 'react'
import Link from 'next/link'
import { HeroCarousel } from './HeroCarousel'

interface HomeHeroProps {
  portfolio?: any[]
}

export function HomeHero({ portfolio = [] }: HomeHeroProps) {
  return (
    <section className="px-5 md:px-12">
      <main className="container mx-auto px-4 pt-24 pb-16  grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center w-full">
        {/* Left Section: Text Content */}
        <div className="order-1 lg:order-1">
          <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.2] tracking-tight">
            Venture Capital <span className="italic text-[#ffb012]">for the</span>
            <br /> Physical World
          </h1>
          <div className="mt-6 md:mt-8 max-w-xl text-base md:text-lg text-neutral-800 leading-relaxed font-light">
            We back founders building breakthrough deep tech across Energy, Climate, and Physical
            AI, bringing hands-on engineering expertise and the product manufacturing networks to
            help you go from prototype to production.
          </div>
          <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
            <a
              href="/pitch"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#ffb012] hover:text-white text-black font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-900 transition-all duration-300 shadow-lg shadow-[#ffb012]/10 w-full sm:w-auto text-center"
            >
              Submit Pitch <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Right Section: Carousel */}
        <div className="order-2 lg:order-2 w-full justify-self-end">
          <HeroCarousel items={portfolio} />
        </div>
      </main>
    </section>
  )
}
