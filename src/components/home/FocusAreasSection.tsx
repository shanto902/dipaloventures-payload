import React from 'react'
import Image from 'next/image'
import { focusAreas } from '@/lib/demo'

// Import images or handle dynamically. For now we use standard next/image if static.
import sectorEnergy from '@/assets/sector-energy.jpg'
import sectorClimate from '@/assets/sector-climate.jpg'
import sectorPhysicalAi from '@/assets/sector-physical-ai.jpg'

const sectorImages: Record<string, any> = {
  energy: sectorEnergy,
  climate: sectorClimate,
  'physical-ai': sectorPhysicalAi,
}

function ImageReplaceOverlay({ lines }: { lines: string[] }) {
  // Keeping as a no-op per original request, but ready if needed.
  return null
}

export function FocusAreasSection() {
  return (
    <section className="bg-neutral-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">
              Where we invest
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
              Three focus areas.
              <br />
              <span className="italic">One thesis.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-neutral-600">
            Manufactured innovations where barriers to entry are highest — and our expertise creates
            the most leverage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {focusAreas.map((f) => {
            const overlayLines =
              f.image === 'energy'
                ? ['REPLACE BEFORE LAUNCH', 'Grid, solar, or energy storage', 'product photo']
                : f.image === 'climate'
                  ? [
                      'REPLACE BEFORE LAUNCH',
                      'Kadeya kiosk or Scalable Systems',
                      'WasteWizer in context',
                    ]
                  : [
                      'REPLACE BEFORE LAUNCH',
                      'NuCurrent device or Vumo scanner',
                      'on a work surface',
                    ]

            return (
              <article
                key={f.title}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform flex flex-col shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={sectorImages[f.image]}
                    alt={`${f.title} sector`}
                    width={1024}
                    height={768}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent" />
                  <div className="absolute top-4 left-5 font-mono text-xs text-white/80 tracking-widest z-30">
                    {f.n}
                  </div>
                  <h3 className="absolute bottom-4 left-5 right-5 font-serif text-2xl font-medium text-white z-30">
                    {f.title}
                  </h3>
                  <ImageReplaceOverlay lines={overlayLines} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-neutral-600 text-sm leading-relaxed">{f.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {f.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
