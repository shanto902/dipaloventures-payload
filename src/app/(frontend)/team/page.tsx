import React from 'react'
import { SiteLayout } from '@/components/SiteLayout'
import { TeamHero } from '@/components/team/TeamHero'
import { TeamGPs } from '@/components/team/TeamGPs'
import { TeamVPs } from '@/components/team/TeamVPs'
import { TeamAdvisors } from '@/components/team/TeamAdvisors'

export const metadata = {
  title: "Team — Dipalo Ventures",
  description: "Operators who invest. Engineers, product builders, and manufacturers who've shipped real things at real scale.",
}

export default function TeamPage() {
  return (
    <SiteLayout>
      <TeamHero />
      <TeamGPs />
      <TeamVPs />
      <TeamAdvisors />
    </SiteLayout>
  )
}
