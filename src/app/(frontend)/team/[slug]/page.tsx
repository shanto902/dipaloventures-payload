import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteLayout } from '@/components/SiteLayout'
import { ArrowLeft } from 'lucide-react'
import { TeamMemberSidebar } from '@/components/team/TeamMemberSidebar'
import { CompanyCard } from '@/components/team/CompanyCard'
import type { Company } from '@/payload-types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'team',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
  })

  if (!docs.length) {
    notFound()
  }

  const member = docs[0]

  // Format photo URL using Cloudinary helper
  let photoUrl = ''
  if (member.photo && typeof member.photo === 'object' && 'url' in member.photo) {
    photoUrl = member.photo.url || ''
  }
  if (photoUrl.includes('/api/media/file/') || photoUrl.includes('/api/gallery/file/')) {
    const filename = decodeURIComponent(photoUrl.split('/').pop() || '')
    photoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
  }

  // Format prior investments list
  const priorInvestments = (member.priorInvestments || [])
    .map((companyItem) => {
      if (typeof companyItem === 'object' && companyItem !== null) {
        const company = companyItem as Company
        let logoUrl = ''
        if (company.logo && typeof company.logo === 'object' && 'url' in company.logo) {
          logoUrl = company.logo.url || ''
        }
        if (logoUrl.includes('/api/media/file/')) {
          const filename = decodeURIComponent(logoUrl.split('/').pop() || '')
          logoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
        }
        return {
          id: company.id,
          name: company.name,
          logo: logoUrl,
          link: company.link || '',
          exit: company.exit || false,
          isInactive: company.isInactive || false,
        }
      }
      return null
    })
    .filter((c): c is NonNullable<typeof c> => c !== null)

  return (
    <SiteLayout className="pt-24 pb-8 md:pt-28 md:pb-12">
      {/* Back Button */}
      <div className="mb-6 md:mb-8">
        <a
          href="/team"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-[#ffb012] transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Team
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Profile Sidebar */}
        <TeamMemberSidebar
          name={member.name}
          photoUrl={photoUrl || undefined}
          category={member.category}
          location={member.location}
          linkedin={member.linkedin}
          orgLinks={member.orgLinks}
        />

        {/* Biography & Investments Grid */}
        <div className="lg:col-span-10 space-y-8">
          {/* Header */}
          <div className="border-b border-neutral-100 pb-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight leading-none mb-2">
              {member.name}
            </h1>
            <p className="text-base md:text-lg text-neutral-600 font-light">
              {member.role} {member.organization ? `at ${member.organization}` : ''}
            </p>
          </div>

          {/* Biography */}
          {member.bio && (
            <div className="space-y-2">
              <h2 className="font-mono uppercase text-xs tracking-[0.25em] text-[#ffb012] font-bold">
                Biography
              </h2>
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-light whitespace-pre-line">
                {member.bio}
              </p>
            </div>
          )}

          {/* Prior Investments */}
          <div className="pt-4 border-t border-neutral-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="font-mono uppercase text-xs tracking-[0.25em] text-[#ffb012] font-bold">
                Prior Investments & Track Record
              </h2>
              {priorInvestments.length > 0 && (
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                  {priorInvestments.length}{' '}
                  {priorInvestments.length === 1 ? 'Company' : 'Companies'}
                </span>
              )}
            </div>

            {priorInvestments.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {priorInvestments.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8 text-center text-neutral-500 font-light">
                No prior investments listed.
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'team',
    limit: 100,
    select: {
      slug: true,
    },
  })

  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({
      slug: doc.slug,
    }))
}
