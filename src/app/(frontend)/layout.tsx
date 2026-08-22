import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toaster } from 'sonner'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = 'Dipalo Ventures — Operators Who Invest'
  const defaultDescription =
    'Early-stage hard tech investing across Energy, Climate, and Physical AI. Chicago-based operators who have shipped physical products at scale'

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })

    return {
      title: siteSettings?.title || defaultTitle,
      description: siteSettings?.description || defaultDescription,
    }
  } catch (error) {
    return {
      title: defaultTitle,
      description: defaultDescription,
    }
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
