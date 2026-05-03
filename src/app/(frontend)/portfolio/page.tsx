import React from 'react'
import { SiteLayout } from '@/components/SiteLayout'
import { PortfolioPageClient } from '@/components/portfolio/PortfolioPageClient'

export const metadata = {
  title: "Portfolio — Dipalo Ventures",
  description: "16 hard tech companies backed across Fund I, Fund II, and SPVs — built by operators, supported by operators.",
}

const page = () => {
  return (
    <SiteLayout>
      <PortfolioPageClient />
    </SiteLayout>
  )
}

export default page
