'use client'

import React from 'react'
import { socialLinks } from '@/lib/demo'

export function MediaInstagram() {
  return (
    <section id="instagram" className="py-16 bg-[#F5F0E8] border-b border-[#d4c9b0]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="font-mono uppercase text-sm tracking-[0.2em] text-amber-600 font-bold">
            02 · Instagram · From the Field
          </div>
        </div>

        <div className="flex overflow-x-auto gap-3 pb-6 scrollbar-hide snap-x snap-mandatory">
          {Array.from({ length: 8 }).map((_, i) => (
            <a
              key={i}
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative flex-shrink-0 w-48 md:w-64 aspect-square rounded-xl overflow-hidden bg-[#d4c9b0] snap-start"
            >
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-all flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100">
                <span className="text-2xl mb-2">◎</span>
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  View on Instagram
                </span>
              </div>
              <div className="w-full h-full flex items-center justify-center text-[#8a7d65]/40 text-4xl">
                ✦
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-600 hover:text-amber-700 hover:underline transition-all font-bold"
          >
            @dipaloventures ↗
          </a>
        </div>
      </div>
    </section>
  )
}
