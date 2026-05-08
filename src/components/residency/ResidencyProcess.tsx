'use client'

import React from 'react'
import { TRLDiagram } from './TRLSection'

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
    d: "Disciplined, deliberate. Real diligence takes time, we won't rush it.",
  },
]

export function ResidencyProcess() {
  const [activeStep, setActiveStep] = React.useState<string | null>('01')

  return (
    <section className="bg-white mx-6 md:mx-12 py-8 border-t border-neutral-100">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-start">
          {/* Left Column: Scope + Timeline */}
          <div className="flex flex-col gap-16">
            {/* Scope Header */}
            <div className="max-w-xl">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
                Apply for the Residency
              </div>
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                Residency surfaces gaps in engineering, supply chain, and time-to-market before they
                become existential threats, enabling founders to address them while there's still
                runway. Startups in TRL 4-6 are ideally suited for the Residency.
              </p>
            </div>

            {/* Vertical Timeline Accordion */}
            <div className="relative">
              {/* Vertical Line - Only spans steps */}
              <div className="absolute left-[31px] top-6 bottom-6 w-px bg-neutral-100" />

              <div className="relative space-y-4">
                {processSteps.map((s) => {
                  const isActive = activeStep === s.n
                  return (
                    <div
                      key={s.n}
                      className={`relative group -mx-4 px-12 py-6 transition-all duration-500 rounded-3xl ${
                        isActive ? 'bg-[#fcfbf9] shadow-sm' : 'hover:bg-neutral-50'
                      }`}
                    >
                      {/* Timeline Node */}
                      <div
                        onClick={() => setActiveStep(isActive ? null : s.n)}
                        className={`absolute left-4 top-[22px] w-9 h-9 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-500 z-10 ${
                          isActive
                            ? 'bg-[#ffb012] border-[#ffb012] text-black scale-110 shadow-lg shadow-amber-200'
                            : 'bg-white border-neutral-100 text-neutral-400 group-hover:border-neutral-200'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold">{s.n}</span>
                      </div>

                      {/* Content */}
                      <button
                        onClick={() => setActiveStep(isActive ? null : s.n)}
                        className="w-full text-left outline-none pl-6"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <h3
                            className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                              isActive
                                ? 'text-neutral-900'
                                : 'text-neutral-500 group-hover:text-neutral-800'
                            }`}
                          >
                            {s.t}
                          </h3>
                          <span
                            className={`text-[#ffb012] transition-all duration-500 ${
                              isActive
                                ? 'rotate-180 opacity-100'
                                : 'rotate-0 opacity-40 group-hover:opacity-100'
                            }`}
                          >
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1L6 6L11 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </button>

                      <div
                        className={`grid transition-all duration-500 ease-in-out pl-6 ${
                          isActive
                            ? 'grid-rows-[1fr] opacity-100 mt-4'
                            : 'grid-rows-[0fr] opacity-0 mt-0 overflow-hidden'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-base text-neutral-600 leading-relaxed font-light pr-6">
                            {s.d}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: TRL Diagram (Sticky) */}
          <div className="lg:sticky lg:top-32 self-start">
            <TRLDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
