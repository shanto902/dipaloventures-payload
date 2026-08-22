import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactLeftColumn } from '@/components/contact/ContactLeftColumn'

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = 'Contact | Dipalo Ventures'
  const defaultDescription =
    'Connect with the firm. Submit technical inquiries and join the operator network.'

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })

    return {
      title: siteSettings?.pageMetadata?.contact?.title || defaultTitle,
      description: siteSettings?.pageMetadata?.contact?.description || defaultDescription,
    }
  } catch (error) {
    return {
      title: defaultTitle,
      description: defaultDescription,
    }
  }
}

export default function ContactPage() {
  return (
    <div className="relative px-5 md:px-12 pt-8 bg-[#fcfbf9]">
      {/* Architectural Studio Tint */}
      <div className="absolute inset-0 bg-[#f7f0e6]/20 -z-10" />

      {/* High-Precision Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] -z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Inquiry Brief */}
          <div className="lg:col-span-6">
            <ContactLeftColumn />
          </div>

          {/* Inquiry Terminal */}
          <div className="lg:col-span-6">
            <div className="w-full max-w-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
