import React from 'react'
import { TeamHeroBackground } from './TeamHeroBackground'
import { TeamHeroHeader } from './TeamHeroHeader'
import { TeamStoryVisual } from './TeamStoryVisual'
import { TeamEtymologyDossier } from './TeamEtymologyDossier'
import { TeamStatsRow } from './TeamStatsRow'

export function TeamHero() {
  return (
    <section className="relative  px-5 md:px-12 pb-8 pt-24 overflow-hidden">
      <TeamHeroBackground />

      <div className="container  mx-auto px-4">
        <TeamHeroHeader />

        {/* Story Content Section */}
        <div className="mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <TeamStoryVisual />

          <div className="space-y-8 ">
            <div className="space-y-6">
              <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light italic">
                A level of product development and manufacturing experience generally not found in
                venture capital. From Motorola to med-tech, we&apos;ve built physical products at
                scale.
              </p>
              <p className="text-base md:text-lg text-neutral-800 font-light leading-relaxed">
                Our GPs come from the design and engineering teams at Motorola and Google — but they
                met later at Chicago startup Jiobit. Rafiq was one of the first investors; Mitul
                designed the PCB electronics. Both saw founders burning through investor cash
                without sufficient mentorship.
              </p>
            </div>

            <TeamEtymologyDossier />
          </div>
        </div>

        <TeamStatsRow />
      </div>
    </section>
  )
}
