'use client'

import React from 'react'
import Image from 'next/image'
import diagram from '@/assets/diagram.jpeg'

const processSteps = [
  {
    n: '01',
    t: 'Submit through the website',
    d: 'Founder application kicks off the conversation.',
  },
  {
    n: '02',
    t: 'Tell us about your work',
    d: "Product, team, IP, business model, traction, and the technical bets you're making.",
  },
  {
    n: '03',
    t: 'Initial review call',
    d: 'A working session with our team to pressure-test the opportunity and learn more.',
  },
  {
    n: '04',
    t: 'Deep technical review',
    d: 'If we advance, we go deep on designs, schematics, IP filings, and data room.',
  },
  {
    n: '05',
    t: 'Decision',
    d: "Disciplined, deliberate. Real diligence takes time — we won't rush it.",
  },
]

export function ResidencyProcess() {
  return (
    <section className="bg-white px-6 md:px-12 py-8 border-t border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          {/* Left Column: Result + Qualification Header */}
          <div className="flex flex-col gap-16">
            {/* The Result */}
            <div className="max-w-xl">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
                The Result
              </div>
              <p className="text-base md:text-lg font-light italic text-neutral-800 leading-relaxed border-l-2 border-[#ffb012] pl-6">
                Residency surfaces gaps in engineering, supply chain, and time-to-market before they
                become existential — so founders can solve them while there&apos;s still runway.
              </p>
            </div>

            {/* How To Qualify */}
            <div className="max-w-xl mb-8">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
                How To Qualify
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tighter mb-8">
                End-to-end. <br />
                <span className="italic text-[#ffb012]">
                  Disciplined screening, deep diligence.
                </span>
              </h2>
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-light pl-6 border-l-2 border-[#ffb012]/20">
                From founder application to portfolio support — a transparent flow. <br />
                Startups in TRL 4–6 are ideally suited to the Residency.
              </p>
            </div>
          </div>

          {/* Right Column: Process Diagram */}
          <div className="">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl group">
              <Image
                src={diagram}
                alt="Process Diagram"
                fill
                className="object-contain transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {processSteps.map((s) => (
            <div
              key={s.n}
              className="group relative flex flex-col transition-all duration-300 hover:-translate-y-1"
            >
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-[#ffb012] font-bold tracking-[0.2em]">
                  {s.n}
                </span>
                <div className="h-px flex-1 bg-neutral-100 group-hover:bg-[#ffb012]/30 transition-colors" />
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 mb-3 group-hover:text-[#ffb012] transition-colors">
                {s.t}
              </h3>

              <p className="text-base text-neutral-800 leading-snug font-light">{s.d}</p>

              {/* Technical Accent */}
              <div className="mt-6 w-8 h-1 bg-neutral-100 group-hover:w-full group-hover:bg-[#ffb012]/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
