import React from 'react'
import Image from 'next/image'
import { testimonialCards } from '@/lib/demo'

export function TestimonialsCarousel() {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-2">
          From our founders
        </div>

        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
            What people <span className="italic">say.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {testimonialCards.map((c) => (
            <TestimonialCard key={c.name} card={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ card }: { card: (typeof testimonialCards)[0] }) {
  const isFounder = card.kind === 'Founder'

  return (
    <article className="flex flex-col bg-white border border-neutral-200 rounded-xl p-6 min-h-[260px] shadow-sm">
      <div>
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full border tracking-widest uppercase font-medium ${isFounder ? 'border-amber-600 text-amber-700' : 'border-emerald-600 text-emerald-700'}`}
        >
          {card.kind}
        </span>
      </div>
      <p className="italic text-sm text-neutral-600 leading-relaxed my-4 flex-1">"{card.quote}"</p>
      <div className="border-t border-neutral-100 pt-4">
        <div className="flex items-center gap-3">
          {card.photo ? (
            <Image
              src={card.photo}
              alt={`${card.name} headshot`}
              width={52}
              height={52}
              className="h-[52px] w-[52px] min-w-[52px] rounded-full object-cover object-top border border-neutral-200 bg-neutral-50"
            />
          ) : (
            <div
              role="img"
              aria-label={`${card.name} headshot placeholder`}
              className="h-[52px] w-[52px] min-w-[52px] rounded-full bg-neutral-100 border border-neutral-200 flex items-end justify-center overflow-hidden text-neutral-400"
            >
              <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true" focusable="false">
                <circle cx="32" cy="24" r="12" fill="currentColor" opacity="0.45" />
                <path d="M8 60c0-13 10.7-22 24-22s24 9 24 22" fill="currentColor" opacity="0.45" />
              </svg>
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-neutral-900">{card.name}</div>
            <div className="text-xs text-neutral-500">{card.role}</div>
          </div>
        </div>
      </div>
    </article>
  )
}
