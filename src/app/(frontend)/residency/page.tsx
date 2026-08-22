import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteLayout } from '@/components/SiteLayout'

import { ResidencyHero } from '@/components/residency/ResidencyHero'
import { ResidencyQuote } from '@/components/residency/ResidencyQuote'
import { ResidencyMethodology } from '@/components/residency/ResidencyMethodology'
import { ResidencyCovers } from '@/components/residency/ResidencyCovers'
import { ResidencyCaseStudies } from '@/components/residency/ResidencyCaseStudies'
import { ResidencyFAQ } from '@/components/residency/ResidencyFAQ'
import { ResidencyRAAS } from '@/components/residency/ResidencyRAAS'
import { ResidencyForFounders } from '@/components/residency/ResidencyForFounders'
import ResidencyCapabilities from '@/components/residency/ResidencyCapabilities'
import { ResidencyProcess } from '@/components/residency/ResidencyProcess'
import { ResidencyExecution } from '@/components/residency/ResidencyExecution'

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = 'The Residency — Dipalo Ventures'
  const defaultDescription =
    'Our technical diligence program identifies product design and engineering gaps before we invest.'

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })

    return {
      title: siteSettings?.pageMetadata?.residency?.title || defaultTitle,
      description: siteSettings?.pageMetadata?.residency?.description || defaultDescription,
    }
  } catch (error) {
    return {
      title: defaultTitle,
      description: defaultDescription,
    }
  }
}

export default function ResidencyPage() {
  return (
    <>
      <ResidencyHero />
      <ResidencyMethodology />
      <ResidencyCapabilities />
      <ResidencyQuote />
      <ResidencyProcess />
      {/* <ResidencyExecution /> */}
      {/* <ResidencyCovers /> */}
      <ResidencyRAAS />
      <ResidencyCaseStudies />
      {/* <ResidencyFAQ /> */}
      {/* <ResidencyForFounders /> */}
    </>
  )
}
