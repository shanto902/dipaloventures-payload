'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface HeroCarouselProps {
  items: {
    name: string
    productImage: string
    logo: string
  }[]
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter items that have a product image
  let products = items.filter((item) => item.productImage)

  // Fallback images if no products found
  const fallbacks = [
    {
      name: 'Energy Transition',
      productImage:
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200',
    },
    {
      name: 'Deep Hardware',
      productImage:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    },
    {
      name: 'Climate Tech',
      productImage:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    },
  ]

  const displayItems = products.length > 0 ? products : fallbacks

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [displayItems.length])

  return (
    <div className="relative w-full">
      {/* Container for images (aspect-square) */}
      <div className="relative aspect-6/4 w-full">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* The Image */}
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={item.productImage}
                alt={item.name}
                fill
                priority={index === 0}
                className="object-contain rounded-3xl transition-transform duration-[10000ms] ease-linear scale-100 group-hover:scale-110"
              />
            </div>

            {/* Content Overlay - Positioned BELOW the image */}
            <div className="absolute top-full left-0 right-0 pt-6 md:pt-8">
              <div className="flex items-end justify-end gap-4">
                {/* <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-500 font-bold">
                    Portfolio Highlight
                  </span>
                  <h4 className="text-xl md:text-2xl font-semibold text-neutral-900 tracking-tight">
                    {item.name}
                  </h4>
                </div> */}

                {/* Pagination Dots */}
                <div className="flex gap-1.5 pb-2">
                  {displayItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === currentIndex
                          ? 'w-8 bg-amber-400'
                          : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
