import React from 'react'
import { SiteLayout } from '@/components/SiteLayout'

import { ResidencyHero } from '@/components/residency/ResidencyHero'
import { ResidencyMethodology } from '@/components/residency/ResidencyMethodology'
import { ResidencyCovers } from '@/components/residency/ResidencyCovers'
import { ResidencyCaseStudies } from '@/components/residency/ResidencyCaseStudies'
import { ResidencyRAAS } from '@/components/residency/ResidencyRAAS'
import { ResidencyForFounders } from '@/components/residency/ResidencyForFounders'

export const metadata = {
  title: 'The Residency — Dipalo Ventures',
  description:
    'Engineering audits, supply chain mapping, and manufacturing support — applied before we invest and continued long after.',
}

export default function ResidencyPage() {
  return (
    <SiteLayout>
      <ResidencyHero />
      <ResidencyMethodology />
      <ResidencyCovers />
      <ResidencyCaseStudies />
      <ResidencyRAAS />
      <ResidencyForFounders />
    </SiteLayout>
  )
}
