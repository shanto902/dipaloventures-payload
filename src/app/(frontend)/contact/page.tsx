import React from 'react'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactLeftColumn } from '@/components/contact/ContactLeftColumn'

export const metadata = {
  title: 'Contact | Dipalo Ventures',
  description: 'Connect with the firm. Submit technical inquiries and join the operator network.',
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
