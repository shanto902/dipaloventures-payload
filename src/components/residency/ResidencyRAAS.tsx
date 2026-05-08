import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import scalableProduct from '@/assets/products/scalable-product.jpg'
import { raasCards } from '@/lib/demo'
import { Button } from '@/components/ui/Button'

export function ResidencyRAAS() {
  return (
    <section id="services" className="relative px-5 md:px-12 py-8 overflow-hidden bg-[#fcfbf9]">
      <div className="container mx-auto px-5 ">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
              Even if we don't invest, we can help you
            </div>

            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.2] tracking-tight italic">
              Not every great company needs
              <br className="hidden md:block" />
              our capital some need our
              <span className="text-[#ffb012]"> operators</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light italic border-l-2 border-[#ffb012]/20 pl-6">
              Reach out even if you're not in our portfolio. Tell us about your product and the
              technical bets you're making, we'll respond within a week.
            </p>
          </div>
        </div>

        <Link
          href="mailto:info@dipaloventures.com"
          className="inline-flex items-center px-8 py-4 bg-[#ffb012] text-black font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-lg shadow-[#ffb012]/10 group w-full sm:w-auto text-center"
        >
          If this is you, reach out
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  )
}
