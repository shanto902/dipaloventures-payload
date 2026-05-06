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

export function FocusAreasSection() {
  return (
    <section className="bg-[#fcfbf9] px-6 md:px-12 py-8 ">
      <div className="container mx-auto px-4">
        {/* Consistent Brand Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-6 ">
          <div className=" ">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-amber-400 mb-6 font-bold">
              Our Thesis
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.2] tracking-tight">
              Software alone won't <br /> solve critical challenges <br />{' '}
              <span className="italic text-amber-400"> for people and the planet</span>
            </h2>
            <div className="mt-10 h-px w-20 bg-amber-400/30" />
          </div>
          <div className="lg:self-end mb-10">
            <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light max-w-3xl  lg:pb-1">
              We're at a historic inflection point. Breakthroughs in materials, manufacturing, and
              supply chains enabled by Artificial Intelligence are unlocking new possibilities — but
              bringing them to market remains hard. Dipalo Ventures provides product expertise and
              deep engineering knowledge to help our founders bring breakthrough scientific and
              engineering innovations to market.
              <br />
              <br />
              We don't just invest capital — we help you build. Our partners are founders and
              operators with firsthand experience taking hard tech products from idea to market. We
              understand the technical risk, the operational complexity, and the path to scale.
            </p>
          </div>
        </div>

        {/* Premium Area Cards */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {focusAreas.map((f, i) => (
            <article key={f.title} className="group">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 mb-8">
                <Image
                  src={sectorImages[f.image]}
                  alt={`${f.title} sector`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 left-6 font-mono text-xs font-bold text-white tracking-widest z-30 drop-shadow-sm">
                  0{i + 1}
                </div>
              </div>

              <div className="relative">
                <h3 className="  text-2xl text-neutral-900 font-medium tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-4 text-base md:text-lg text-neutral-800 leading-relaxed font-light line-clamp-3">
                  {f.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono uppercase tracking-[0.1em] px-3 py-1 rounded-full border border-neutral-200 text-neutral-600 font-bold group-hover:border-amber-400/30 group-hover:text-amber-400 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
