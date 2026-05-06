import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import scalableProduct from '@/assets/products/scalable-product.jpg'
import { raasCards } from '@/lib/demo'
import { Button } from '@/components/ui/Button'

export function ResidencyRAAS() {
  return (
    <section
      id="services"
      className="relative px-5 md:px-12 py-12 md:py-16 overflow-hidden bg-[#fcfbf9]"
    >
      <div className="container mx-auto px-5 ">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                Standalone Partnership
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.2] tracking-tight italic">
              Not every great company needs our capital. <br className="hidden md:block" />
              Some just need our <span className="text-amber-500">operators.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light italic border-l-2 border-amber-400/20 pl-6">
              We&apos;re beginning to offer Residency as a standalone engagement — selective,
              limited, and starting now.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-amber-400 text-black font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-lg shadow-amber-400/10 group w-full sm:w-auto text-center"
        >
          If this is you, reach out
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  )
}
