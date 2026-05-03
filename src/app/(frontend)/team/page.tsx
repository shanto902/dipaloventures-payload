import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteLayout } from '@/components/SiteLayout'
import { TeamHero } from '@/components/team/TeamHero'
import { TeamGPs } from '@/components/team/TeamGPs'

import { TeamVPs } from '@/components/team/TeamVPs'
import { TeamAdvisors } from '@/components/team/TeamAdvisors'
import React from 'react'

export const metadata = {
  title: 'Team — Dipalo Ventures',
  description:
    "Operators who invest. Engineers, product builders, and manufacturers who've shipped real things at real scale.",
}

export default async function TeamPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: teamDocs } = await payload.find({
    collection: 'team',
    depth: 1,
    sort: 'order', // Sort by order field ascending
  })

  // Map Payload docs to the format expected by components
  const members = teamDocs.map((doc: any) => {
    let photoUrl = doc.photo?.url || ''

    // If the URL is a legacy local path (absolute or relative), reconstruct the Cloudinary URL
    if (photoUrl.includes('/api/media/file/')) {
      const filename = photoUrl.split('/').pop()
      photoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    }

    return {
      name: doc.name,
      role: doc.role,
      location: doc.location,
      organization: doc.organization || '',
      bio: doc.bio,
      photo: photoUrl,
      linkedin: doc.linkedin || '',
      orgLinks: doc.orgLinks || [],
      category: doc.category,
    }
  })

  const gps = members.filter((m) => m.category === 'gp')
  const vps = members.filter((m) => m.category === 'vp')
  const advisors = members.filter((m) => m.category === 'advisor')

  return (
    <SiteLayout>
      <TeamHero />
      <TeamGPs members={gps.length > 0 ? gps : undefined} />
      <TeamVPs members={vps.length > 0 ? vps : undefined} />
      <TeamAdvisors advisors={advisors.length > 0 ? advisors : undefined} />
    </SiteLayout>
  )
}
