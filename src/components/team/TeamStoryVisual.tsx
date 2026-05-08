'use client'

import React, { useState, useEffect } from 'react'

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80',
]

const shuffleArray = (array: any[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const TeamStoryVisual = ({
  images = [],
  filterPosters = true,
}: {
  images?: string[]
  filterPosters?: boolean
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [displayImages, setDisplayImages] = useState<string[]>(
    images.length > 0 ? images : FALLBACK_IMAGES,
  )

  useEffect(() => {
    const loadInstagramImages = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/instagram?filter=${filterPosters}`)
        if (!res.ok) {
          setIsLoading(false)
          return
        }
        const posts = await res.json()
        const instaUrls = posts
          .filter(
            (p: any) =>
              p.media_type === 'IMAGE' ||
              p.media_type === 'CAROUSEL_ALBUM' ||
              p.media_type === 'VIDEO',
          )
          .map((p: any) => p.media_url || p.thumbnail_url)

        if (instaUrls.length > 0) {
          setDisplayImages(shuffleArray([...instaUrls, ...images]))
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading instagram stories:', err)
        setIsLoading(false)
      }
    }

    loadInstagramImages()
  }, [images, filterPosters])

  const handleImageError = (src: string) => {
    setDisplayImages((prev) => {
      const filtered = prev.filter((img) => img !== src)
      if (currentIndex >= filtered.length) {
        setCurrentIndex(0)
      }
      return filtered
    })
  }

  useEffect(() => {
    if (displayImages.length <= 1 || isLoading) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [displayImages.length, isLoading])

  const getVisibleRange = () => {
    if (displayImages.length === 0) return []
    const prev = (currentIndex - 1 + displayImages.length) % displayImages.length
    const next = (currentIndex + 1) % displayImages.length
    return Array.from(new Set([prev, currentIndex, next]))
  }

  const visibleIndices = getVisibleRange()

  return (
    <div className="relative group">
      <div className="relative aspect-5/3 w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-neutral-50 flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#ffb012]/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            <div className="w-12 h-12 rounded-full border-2 border-[#ffb012]/10 border-t-[#ffb012] animate-spin" />
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb012] font-bold animate-pulse">
              Fetching_Media...
            </div>
          </div>
        )}

        {displayImages.map((src, index) => {
          const isVisible = visibleIndices.includes(index)
          if (!isVisible) return null

          return (
            <div
              key={src + index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={src}
                alt={`Team story image ${index + 1}`}
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-10000 ease-linear scale-100 group-hover:scale-110"
                loading={index === currentIndex ? 'eager' : 'lazy'}
                onError={() => handleImageError(src)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
