import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import scalableProduct from '@/assets/products/scalable-product.jpg'
import { raasCards } from '@/lib/demo'

export function ResidencyRAAS() {
  return (
    <section id="services" className="bg-neutral-100 py-24 border-y border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">
              New offering
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
              Residency <span className="italic">as a Service.</span>
            </h2>
            <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
              Not every great founder fits our investment thesis — but most can benefit from
              operator-grade engineering and supply chain support. RAAS extends Residency to
              companies, corporates, and co-investors as a standalone engagement.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex px-6 py-3 bg-amber-400 text-white font-medium rounded-md hover:bg-amber-700 transition-colors"
            >
              Engage Residency →
            </Link>
            <div className="mt-10 relative aspect-4/3 overflow-hidden rounded-xl border border-neutral-200">
              <Image
                src={scalableProduct}
                alt="Residency as a Service in action"
                fill
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {raasCards.map((x) => (
              <article
                key={x.t}
                className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm"
              >
                <div className="font-serif text-xl font-medium text-neutral-900 leading-tight">
                  {x.t}
                </div>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{x.b}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
