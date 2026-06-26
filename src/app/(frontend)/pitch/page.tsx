import React from 'react'
import { PitchForm } from '@/components/pitch/PitchForm'

export const metadata = {
  title: 'Submit Pitch | Dipalo Ventures',
  description:
    'Submit your pitch to Dipalo Ventures. We back early-stage hard tech across energy, climate, and physical AI.',
}

export default function PitchPage() {
  return (
    <div className="relative px-5 md:px-12 pt-8 pb-20 bg-[#fcfbf9]">
      {/* Architectural studio tint */}
      <div className="absolute inset-0 bg-[#f7f0e6]/20 -z-10" />

      {/* High-precision grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] -z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Intro */}
        <header className="max-w-3xl mb-10">
          <div className="font-mono text-xs font-bold tracking-widest text-[#d98a12] uppercase mb-4 flex items-center gap-3">
            <span className="w-6 h-0.5 bg-[#ffb012] inline-block" />
            Application
          </div>
          <h1 className="!text-4xl md:!text-5xl font-bold tracking-tight leading-[0.98] mb-4">
            Submit your pitch <span className="text-[#e8a020] italic">to Dipalo</span>
          </h1>
          <p className="text-neutral-600 leading-relaxed max-w-2xl !text-base md:!text-lg">
            Tell us about your company — we back early-stage hard tech across energy, climate, and
            physical AI. Please note we do <strong className="text-neutral-900">not</strong> invest
            in software-only startups. Questions?{' '}
            <a
              href="mailto:deals@dipaloventures.com"
              className="text-[#b9780c] font-semibold no-underline border-b-[1.5px] border-[#ffb012]/45"
            >
              deals@dipaloventures.com
            </a>
          </p>
        </header>

        <PitchForm />
      </div>
    </div>
  )
}
