import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { residencyTags } from '@/lib/demo'

export function ResidencySection() {
  return (
    <section className="bg-neutral-100 py-16 md:py-24 border-y border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-white w-full mx-auto max-h-[400px] max-w-[520px] aspect-[4/3]">
            {/* Replace with actual residency image later */}
            <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400">
              [Residency Image]
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">
              The Dipalo Residency
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
              Better selection, <span className="italic">lower failure rates.</span>
            </h2>
            <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
              The Dipalo Residency is a technical diligence and audit program that identifies and
              mitigates gaps in product design and engineering. It provides technical evaluations,
              workshops, mentorship, and specific design and engineering support — before we invest
              and long after.
            </p>
            <div className="mt-6 text-xs uppercase tracking-[0.1em] text-neutral-500 font-medium">
              What we embed with you:
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {residencyTags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-3 py-1 rounded-full border border-amber-500 text-amber-600"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/residency"
                className="text-sm text-amber-600 hover:opacity-80 underline underline-offset-4"
              >
                Explore the Residency →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
