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

  const { docs: teamDocs } = await payload.find({
    collection: 'team',
    depth: 1,
    sort: 'order',
    limit: 5,
  })

  const teamMembers = teamDocs.map((doc: any) => {
    let photoUrl = doc.photo?.url || ''

    // If the URL is a legacy local path (absolute or relative), reconstruct the Cloudinary URL
    if (photoUrl.includes('/api/media/file/')) {
      const filename = photoUrl.split('/').pop()
      photoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    }

    return {
      name: doc.name,
      role: doc.role,
      photo: photoUrl,
    }
  })

  const { docs: portfolioDocs } = await payload.find({
    collection: 'portfolio',
    depth: 1,
    where: {
      featured: { equals: true },
    },
    sort: 'order',
  })

  const portfolioItems = portfolioDocs.map((doc: any) => {
    let logoUrl = doc.logo?.url || ''

    // Robust Cloudinary reconstruction
    if (logoUrl.includes('/api/media/file/')) {
      const filename = logoUrl.split('/').pop()
      logoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    }

    return {
      name: doc.name,
      logo: logoUrl,
      url: doc.url,
    }
  })

  const { docs: testimonialDocs } = await payload.find({
    collection: 'testimonials',
    depth: 1,
    sort: 'order',
  })

  const testimonials = testimonialDocs.map((doc: any) => {
    let photoUrl = doc.photo?.url || ''
    if (photoUrl.includes('/api/media/file/')) {
      const filename = photoUrl.split('/').pop()
      photoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    }

    return {
      name: doc.name,
      role: doc.role,
      quote: doc.quote,
      kind: doc.kind,
      photo: photoUrl,
      initials: doc.name
        .split(' ')
        .map((n: string) => n[0])
        .join(''),
    }
  })

  return (
    <>
      <SiteLayout>
        <HomeHero />
        <HomeMission />
      </SiteLayout>
      <FounderInvestorToggle />
      <PlatformSection />
      <SiteLayout>
        <ResidencySection />
        <TeamSection members={teamMembers.length > 0 ? teamMembers : undefined} />
      </SiteLayout>
      <FocusAreasSection />
      <SiteLayout>
        <PortfolioMarquee items={portfolioItems.length > 0 ? portfolioItems : undefined} />
      </SiteLayout>
      <TestimonialsCarousel testimonials={testimonials.length > 0 ? testimonials : undefined} />
    </>
  )
}
