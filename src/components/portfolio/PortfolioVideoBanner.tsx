'use client'

import React from 'react'
import Image from 'next/image'
import heroPoster from '@/assets/hero-warm.jpg'

interface Props {
  videoPlaying: boolean
  setVideoPlaying: (playing: boolean) => void
}

export function PortfolioVideoBanner({ videoPlaying, setVideoPlaying }: Props) {
  return (
    <section className="container mt-20 mx-auto px-4 pt-8">
      <div className="relative mx-auto w-full md:w-[80%] overflow-hidden rounded-2xl bg-neutral-100 aspect-video">
        {videoPlaying ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/1F7HNG15VO4?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
            title="Portfolio reel"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setVideoPlaying(true)}
            aria-label="Play portfolio reel"
            className="group absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            <Image
              src={heroPoster}
              alt="Video thumbnail"
              fill
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span
              className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/10 transition-colors"
              aria-hidden
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/95 shadow-lg group-hover:scale-105 transition-transform"
              style={{ width: 84, height: 84 }}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" width="34" height="34" fill="#e8a020">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
