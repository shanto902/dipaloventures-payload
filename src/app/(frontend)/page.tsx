import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

import { SiteLayout } from '@/components/SiteLayout'
import { HomeHero } from '@/components/home/HomeHero'

import { FounderInvestorToggle } from '@/components/home/FounderInvestorToggle'

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
    where: {
      category: { equals: 'gp' },
    },
    sort: 'order',
    limit: 2,
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
      category: doc.category,
      bio: doc.bio,
      linkedin: doc.linkedin,
    }
  })

  const { docs: portfolioDocs } = await payload.find({
    collection: 'portfolio',
    depth: 1,
    where: {
      featured: { equals: true },
    },
    sort: 'name',
    limit: 100,
  })

  const portfolioItems = portfolioDocs.map((doc: any) => {
    let logoUrl = doc.logo?.url || ''
    let productUrl = doc.productImage?.url || ''

    // Robust Cloudinary reconstruction for logo
    if (logoUrl.includes('/api/media/file/')) {
      const filename = logoUrl.split('/').pop()
      logoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    }

    // Robust Cloudinary reconstruction for productImage
    if (productUrl.includes('/api/media/file/')) {
      const filename = productUrl.split('/').pop()
      productUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    }

    return {
      name: doc.name,
      logo: logoUrl,
      productImage: productUrl,
      url: doc.url,
      isExited: doc.isExited,
    }
  })

  const { docs: testimonialDocs } = await payload.find({
    collection: 'testimonials',
    depth: 1,
    sort: 'order',
    limit: 100,
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
      <HomeHero portfolio={portfolioItems} />
      <FocusAreasSection />
      <FounderInvestorToggle />
      <ResidencySection />
      <TeamSection members={teamMembers.length > 0 ? teamMembers : undefined} />
      <PortfolioMarquee items={portfolioItems.length > 0 ? portfolioItems : undefined} />
      <TestimonialsCarousel testimonials={testimonials.length > 0 ? testimonials : undefined} />
    </>
  )
}
