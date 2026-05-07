'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { testimonialCards } from '@/lib/demo'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2)

  useEffect(() => {
    const updateItems = () => setItemsPerView(window.innerWidth < 768 ? 1 : 2)
    updateItems()
    window.addEventListener('resize', updateItems)
    return () => window.removeEventListener('resize', updateItems)
  }, [])

  const maxIndex = Math.max(0, displayCards.length - itemsPerView)

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section className="bg-white px-6 md:px-12 pt-8 pb-16 border-y border-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
          <div className="max-w-2xl">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#ffb012] mb-6 font-bold">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Voices from Our Network
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between md:justify-start gap-6">
            <div className="font-mono text-xs md:text-xs tracking-widest text-neutral-600 font-bold">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(displayCards.length).padStart(2, '0')}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-[#ffb012] hover:text-[#ffb012] transition-all active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-[#ffb012] hover:text-[#ffb012] transition-all active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] gap-6"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex * (24 / itemsPerView)}px))`,
            }}
          >
            {displayCards.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="w-full md:w-[calc(50%-12px)] shrink-0 transition-opacity duration-500"
                style={{
                  opacity: i >= currentIndex && i < currentIndex + itemsPerView ? 1 : 0.4,
                }}
              >
                <TestimonialCard card={c} />
              </div>
            ))}
          </div>
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
            <div className="absolute inset-0 flex items-center justify-center   text-2xl text-neutral-500">
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
