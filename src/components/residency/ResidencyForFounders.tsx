import React from 'react'
import Link from 'next/link'
import { lookFor } from '@/lib/demo'

export function ResidencyForFounders() {
  return (
    <section className=" border-t border-neutral-200 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">
            For founders
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
            We're looking for <span className="italic">you.</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-600 max-w-xl leading-relaxed">
            If this sounds like your company, we want to hear from you.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lookFor.map((w) => (
            <article
              key={w.t}
              className="bg-white border border-neutral-200 rounded-xl p-6 hover:border-amber-600 transition-colors shadow-sm"
            >
              <div className="text-2xl text-amber-600">{w.ico}</div>
              <div className="mt-5 font-serif text-xl font-medium text-neutral-900 leading-tight">
                {w.t}
              </div>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{w.b}</p>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 bg-neutral-900 text-white font-medium rounded-md hover:bg-neutral-800 transition-colors"
          >
            Submit your pitch →
          </Link>
        </div>
      </div>
    </section>
  )
}
