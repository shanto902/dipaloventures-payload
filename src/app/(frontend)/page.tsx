import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

import { SiteLayout } from '@/components/SiteLayout'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeMission } from '@/components/home/HomeMission'
import { FounderInvestorToggle } from '@/components/home/FounderInvestorToggle'
import { PlatformSection } from '@/components/home/PlatformSection'
import { ResidencySection } from '@/components/home/ResidencySection'
import { TeamSection } from '@/components/home/TeamSection'
import { FocusAreasSection } from '@/components/home/FocusAreasSection'
import { PortfolioMarquee } from '@/components/home/PortfolioMarquee'
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel'
export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <SiteLayout>
      <HomeHero />
      <HomeMission />
      <FounderInvestorToggle />
      <PlatformSection />
      <ResidencySection />
      <TeamSection />
      <FocusAreasSection />
      <PortfolioMarquee />
      <TestimonialsCarousel />
    </SiteLayout>
  )
}
