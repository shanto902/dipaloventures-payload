'use client'

import React, { useState, useEffect } from 'react'

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
]

export const TeamStoryVisual = ({ images = [] }: { images?: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayImages = images.length > 0 ? images : FALLBACK_IMAGES

  useEffect(() => {
    if (displayImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [displayImages.length])

  return (
    <div className="relative group">
      {/* Decorative border */}
      <div className="absolute -inset-4 border border-[#ffb012]/20 rounded-[2.5rem] -rotate-1 transition-transform duration-700 group-hover:rotate-0" />
      {/* Carousel Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100 border border-neutral-200/50 shadow-2xl">
        {displayImages.map((src, index) => (
          <div
            key={src + index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={src}
              alt={`Team story image ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-10000 ease-linear scale-100 group-hover:scale-110"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Pagination Dots */}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? 'w-6 bg-[#ffb012]' : 'w-1.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}
