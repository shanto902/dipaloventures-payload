import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteLayout } from '@/components/SiteLayout'
import { PortfolioPageClient } from '@/components/portfolio/PortfolioPageClient'

export const metadata = {
  title: 'Portfolio — Dipalo Ventures',
  description:
    '16 hard tech companies backed across Fund I, Fund II, and SPVs — built by operators, supported by operators.',
}

export default async function PortfolioPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: portfolioDocs } = await payload.find({
    collection: 'portfolio',
    depth: 1,
    sort: 'order',
  })

  const portfolioItems = portfolioDocs.map((doc: any) => {
    let logoUrl = doc.logo?.url || ''
    let productImageUrl = doc.productImage?.url || ''

    // Robust Cloudinary reconstruction
    if (logoUrl.includes('/api/media/file/')) {
      const filename = logoUrl.split('/').pop()
      logoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    }

    if (productImageUrl.includes('/api/media/file/')) {
      const filename = productImageUrl.split('/').pop()
      productImageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    }

    return {
      id: doc.id,
      name: doc.name,
      url: doc.url,
      fundKeys: doc.fundKeys || [],
      sector: doc.sector,
      stage: doc.stage,
      desc: doc.desc,
      logo: logoUrl,
      productImage: productImageUrl,
      exit: doc.exit,
      isExited: doc.isExited,
    }
  })

  return <PortfolioPageClient items={portfolioItems.length > 0 ? portfolioItems : undefined} />
}
