import React from 'react'
import Image from 'next/image'
import vumoProduct from '@/assets/products/vumo-product.jpg'

export function ResidencyHero() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-4">
          The Residency
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 leading-tight">
          A technical diligence + product development <span className="italic">program.</span>
        </h1>
        <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
          The Dipalo Residency is how we de-risk hard tech. Engineering audits, supply chain
          mapping, and manufacturing support — applied before we invest, and continued long after.
        </p>
      </div>

      <div className="mt-10 relative aspect-21/9 overflow-hidden rounded-2xl border border-neutral-200">
        <Image
          src={vumoProduct}
          alt="Residency at work"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-6">
        <figure className="bg-neutral-100 border border-neutral-200 p-10 rounded-xl">
          <blockquote className="font-serif text-2xl leading-snug text-neutral-900">
            "There's a tremendous amount of <span className="italic">craftsmanship</span> in between
            a great idea and a great product."
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold">
            — Dipalo Ventures
          </figcaption>
        </figure>
        <div className="bg-white border border-neutral-200 p-8 rounded-xl shadow-sm">
          <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold">
            The Result
          </div>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            Residency surfaces gaps in engineering, supply chain, and time-to-market before they
            become existential — so founders can solve them while there's still runway.
          </p>
        </div>
      </div>
    </section>
  )
}
