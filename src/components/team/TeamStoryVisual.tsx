import React from 'react'

const HERO_CITY_IMG = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80'

export const TeamStoryVisual = () => (
  <div className="relative group">
    <div className="absolute -inset-4 border border-amber-400/20 rounded-[2.5rem] -rotate-1 transition-transform duration-700 group-hover:rotate-0" />
    <div className="relative aspect-video overflow-hidden rounded-4xl bg-neutral-900 shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url('${HERO_CITY_IMG}')` }}
        aria-label="Chicago skyline at dusk"
      />
    </div>
  </div>
)
