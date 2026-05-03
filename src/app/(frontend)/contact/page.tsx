import React from 'react'
import { SiteLayout } from '@/components/SiteLayout'
import { ContactLeftColumn } from '@/components/contact/ContactLeftColumn'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactQuickFacts } from '@/components/contact/ContactQuickFacts'

export const metadata = {
  title: 'Contact — Dipalo Ventures',
  description: 'Submit your hard tech company or request LP information from Dipalo Ventures.',
}

export default function ContactPage() {
  return (
    <SiteLayout>
      <section className="container mt-10 mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-stretch">
          <div className="w-full md:w-1/2">
            <ContactLeftColumn />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6 lg:gap-8">
            <ContactForm />
            <ContactQuickFacts />
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
