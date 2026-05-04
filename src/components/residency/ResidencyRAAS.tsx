import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import scalableProduct from '@/assets/products/scalable-product.jpg'
import { raasCards } from '@/lib/demo'
import { Button } from '@/components/ui/Button'

export function ResidencyRAAS() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Studio Tint */}
      <div className="absolute inset-0  border-y border-neutral-100 -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
                Standalone Partnership
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Residency <br />
              <span className="italic   text-amber-400">as a Service.</span>
            </h2>
            <p className="mt-8 text-lg text-neutral-500 leading-relaxed font-normal italic border-l-2 border-amber-400/20 pl-6">
              Not every great founder fits our investment thesis — but most can benefit from
              operator-grade engineering and supply chain support. RAAS extends Residency as a
              standalone engagement.
            </p>

            <div className="mt-16 group relative aspect-video overflow-hidden rounded-[2rem] border border-neutral-100 shadow-2xl shadow-neutral-900/5">
              <Image
                src={scalableProduct}
                alt="Residency as a Service in action"
                fill
                className="absolute inset-0 h-full w-full object-cover   transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">
                  Field Deployment
                </span>
                <p className="text-white text-sm italic opacity-80 mt-1">
                  Operational Audit: Scalable Systems
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-neutral-100 border border-neutral-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-neutral-900/5">
            {raasCards.map((x) => (
              <article
                key={x.t}
                className="bg-white p-10 flex flex-col group transition-all duration-500 hover:bg-amber-50/30"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100 group-hover:bg-amber-400 group-hover:border-amber-400 transition-all duration-500">
                    <span className="text-amber-500 group-hover:text-neutral-900 transition-colors text-xs font-mono font-bold">
                      ✦
                    </span>
                  </div>
                </div>
                <h3 className="  text-xl md:text-2xl font-medium text-neutral-900 mb-4 transition-colors group-hover:text-amber-500">
                  {x.t}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light group-hover:text-neutral-600 transition-colors">
                  {x.b}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
