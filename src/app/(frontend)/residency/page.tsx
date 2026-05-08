import React from 'react'
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

export const metadata = {
  title: 'The Residency — Dipalo Ventures',
  description:
    'Our technical diligence program identifies product design and engineering gaps before we invest.',
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
