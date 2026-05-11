'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselImage = {
  url: string
  alt?: string
}

export function ResidencyCarousel({ images }: { images: CarouselImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images?.length])

  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-neutral-100 to-white flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 rounded-full border border-[#ffb012]/20 flex items-center justify-center mb-6 relative">
          <div className="w-2 h-2 bg-[#ffb012] rounded-full animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-[#ffb012]/10 scale-150 animate-ping" />
        </div>
        <div className="italic text-2xl text-neutral-600">Technical Residency</div>
      </div>
    )
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-full w-full group/carousel overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <Image
            src={img.url}
            alt={img.alt || 'Residency Image'}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      
      {/* Navigation arrows visible on hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-[#ffb012] hover:text-black z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-[#ffb012] hover:text-black z-20"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(i)
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIndex ? 'bg-[#ffb012] w-6' : 'bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
    </div>
  )
}
