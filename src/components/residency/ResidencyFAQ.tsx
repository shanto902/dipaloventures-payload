'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: "Who's eligible for the Residency?",
    a: 'We focus on hard-tech startups in TRL 4–6 — beyond a benchtop prototype, with a working system in a relevant environment, but not yet in full-scale production. Founders should have IP, designs, and a real data room we can dig into.',
  },
  {
    q: 'How long does the decision process take?',
    a: "Initial review calls happen within 1–2 weeks of a complete submission. If we advance to deep technical diligence, expect 3–6 weeks of close engagement before a final decision. Real diligence takes time — we don't rush it.",
  },
  {
    q: 'What happens after the initial review call?',
    a: "If there's mutual fit, we open a working data room and begin a deep technical review of designs, schematics, IP filings, and supply chain assumptions. You'll spend real time with our operators — not just partners — pressure-testing the build plan.",
  },
  {
    q: 'Do I need to take investment to access Residency?',
    a: 'No. Through Residency as a Service, founders can engage our operators on a standalone basis — selective and limited, but open to companies outside our portfolio.',
  },
  {
    q: 'What sectors do you cover?',
    a: 'Physical AI, climate, advanced manufacturing, robotics, and connected hardware. If your product lives in the physical world and the engineering is the hard part, we want to hear from you.',
  },
]

export function ResidencyFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12 border-t border-neutral-100">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
          {/* Left: Section Info */}
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tighter">
              Common <br />
              <span className="italic text-[#ffb012]">Inquiries.</span>
            </h2>
            <p className="mt-8 text-base text-neutral-600 leading-relaxed font-light max-w-sm">
              Everything you need to know about the Residency program, diligence process, and
              partnership model.
            </p>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`group border border-neutral-100 rounded-3xl transition-all duration-300 ${
                  openIndex === idx
                    ? 'bg-[#fcfbf9] border-amber-200/50 shadow-sm'
                    : 'hover:border-neutral-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-6"
                >
                  <span
                    className={`text-lg md:text-xl font-medium tracking-tight transition-colors duration-300 ${
                      openIndex === idx
                        ? 'text-neutral-900'
                        : 'text-neutral-700 group-hover:text-neutral-900'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      openIndex === idx
                        ? 'bg-[#ffb012] border-[#ffb012] text-black'
                        : 'border-neutral-200 text-neutral-400'
                    }`}
                  >
                    {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                    <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-light border-l-2 border-[#ffb012]/30 pl-6">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
