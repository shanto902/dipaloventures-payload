'use client'

import React from 'react'
import Image from 'next/image'
import { testimonialCards } from '@/lib/demo'

type Testimonial = {
  name: string
  role: string
  quote: string
  kind: string
  photo?: string
  initials?: string
}

export function TestimonialsCarousel({ testimonials }: { testimonials?: Testimonial[] }) {
  const displayCards = testimonials || testimonialCards

  return (
    <section className="bg-white px-6 md:px-12 pt-8 pb-16 border-y border-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#ffb012] mb-6 font-bold">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Voices from Our Network
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCards.map((c, i) => (
            <div key={`${c.name}-${i}`} className="h-full">
              <TestimonialCard card={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ card }: { card: Testimonial }) {
  return (
    <article className="group bg-white border border-neutral-200/60 rounded-[2rem] md:rounded-[2.5rem] p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-[#ffb012]/20 flex flex-col h-full">
      <div className="relative flex-1">
        {/* Decorative Quote Mark */}
        <div className="absolute -top-6 -left-6 text-8xl   text-neutral-50 group-hover:text-[#ffb012]/10 transition-colors duration-500 pointer-events-none">
          &ldquo;
        </div>

        <p className="relative z-10 text-base md:text-lg text-neutral-800 leading-relaxed font-light italic tracking-tight">
          {card.quote}
        </p>
      </div>

      <div className=" pt-5 border-t border-neutral-50 flex items-center gap-6">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
          {card.photo ? (
            <Image
              src={card.photo}
              alt={card.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center   text-2xl text-neutral-600">
              {card.initials || card.name.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <div className="text-xl   font-medium text-neutral-900 tracking-tight">{card.name}</div>
          <div className="mt-1.5 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-600 font-bold whitespace-nowrap">
              {card.role}
            </span>
            <span className="h-px w-6 bg-neutral-200 hidden sm:block" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ffb012] font-bold whitespace-nowrap">
              {card.kind}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
